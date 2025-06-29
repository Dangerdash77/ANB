const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
require('dotenv').config();
const authMiddleware = require('./middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const Product = require('./models/Product');

// ✅ CORS CONFIGURATION (must be before routes)
const corsOptions = {
  origin: 'https://www.anbindustries.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight requests

// ✅ Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'anb'
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch(err => {
  console.error('❌ MongoDB error:', err);
});

// ✅ User model
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String },
  password: { type: String },
  role: { type: String, default: 'user' }
});
const User = mongoose.model('User', UserSchema);

// ✅ Routes
app.get("/", (req, res) => res.send("🌐 ANB Server is running!"));

// ✅ Get all products (public)
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
});

// ✅ Add a product (owner only)
app.post('/api/products', authMiddleware, async (req, res) => {
  if (req.user.role !== 'owner') {
    return res.status(403).json({ success: false, message: 'Forbidden: Only owners can add products' });
  }

  const { name, image, minQty, details } = req.body;
  if (!name || !image || !minQty || !details) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const product = new Product({ name, image, minQty, details });
    await product.save();
    res.status(201).json({ success: true, message: 'Product added', product });
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ success: false, message: 'Server error while adding product' });
  }
});

// ✅ Update product (owner only)
app.put('/api/products/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'owner') return res.status(403).json({ message: 'Forbidden' });

  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating product' });
  }
});

// ✅ Delete product (owner only)
app.delete('/api/products/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'owner') return res.status(403).json({ message: 'Forbidden' });

  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting product' });
  }
});

// ✅ Auth routes
app.post('/api/signup', async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ success: false, message: 'Username already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  res.json({ success: true, message: 'Signup successful' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

  const token = jwt.sign(
    { username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '2d' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'Strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 2
  }).json({ success: true, message: 'Logged in', role: user.role });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token').json({ success: true, message: 'Logged out' });
});

app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({
    message: `Welcome ${req.user.username}, you are logged in as ${req.user.role}`,
    user: req.user,
  });
});

app.get('/api/admin-only', authMiddleware, (req, res) => {
  if (req.user.role !== 'owner') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  res.json({ message: 'Hello Admin!' });
});

app.put('/api/update-role', async (req, res) => {
  const { username, newRole } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate({ username }, { role: newRole }, { new: true });
    if (!updatedUser) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, message: 'Role updated', user: updatedUser });
  } catch (err) {
    console.error('Role update error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ Mail handlers
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'anbind2020@gmail.com',
    pass: 'qone uqnq frtp pgny'
  },
});

app.post('/api/send-mail', async (req, res) => {
  const { type, name, email, phone, company, address, items } = req.body;

  const itemList = items.map(item => `<li>${item.name} (Qty: ${item.quantity})</li>`).join('');
  const addressLine = address ? `<p><strong>Address:</strong> ${address}</p>` : '';

  const mailOptions = {
    from: 'anbind2020@gmail.com',
    to: 'anbind2020@gmail.com',
    subject: `New ${type} Request from ${name}`,
    html: `
      <h2>${type} Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      ${addressLine}
      <h3>Requested Items:</h3>
      <ul>${itemList}</ul>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Mail sent successfully' });
  } catch (err) {
    console.error('Mail error:', err);
    res.status(500).json({ success: false, message: 'Mail sending failed' });
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
  }

  const mailOptions = {
    from: 'anbind2020@gmail.com',
    to: 'anbind2020@gmail.com',
    subject: `Contact Us Message from ${name}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <h3><strong>Subject:</strong> ${subject}</h3>
      <p><strong>Message:</strong> <br>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Your message was sent successfully!' });
  } catch (err) {
    console.error('Contact mail error:', err);
    res.status(500).json({ success: false, message: 'Message sending failed' });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
