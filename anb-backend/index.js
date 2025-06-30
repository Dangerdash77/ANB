const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const authMiddleware = require('./middleware/authMiddleware'); // ✅ use ./ not ../
const Product = require('./models/Product');

const app = express();

// ✅ CORS CONFIGURATION
const corsOptions = {
  origin: 'https://www.anbindustries.com', // Update as needed
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// ✅ Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'anb',
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch(err => {
  console.error('❌ MongoDB error:', err);
});

// ✅ User Model
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: String,
  password: String,
  role: { type: String, default: 'user' },
});
const User = mongoose.model('User', UserSchema);

// ✅ Base Route
app.get('/', (req, res) => res.send('🌐 ANB Server is running!'));

// ✅ Product Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
});

app.post('/api/products', authMiddleware, async (req, res) => {
  if (req.user.role !== 'owner') {
    return res.status(403).json({ success: false, message: 'Forbidden: Only owners can add products' });
  }

  const { name, image, minQty, size, color, material, stdPacking } = req.body;
  if (!name || !image || !minQty) {
    return res.status(400).json({ success: false, message: 'Required fields missing' });
  }

  try {
    const product = new Product({ name, image, minQty, size, color, material, stdPacking });
    await product.save();
    res.status(201).json({ success: true, message: 'Product added', product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error while adding product' });
  }
});

app.put('/api/products/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'owner') return res.status(403).json({ message: 'Forbidden' });

  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating product' });
  }
});

app.delete('/api/products/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'owner') return res.status(403).json({ message: 'Forbidden' });

  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting product' });
  }
});

// ✅ Auth Routes
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Username already exists' });
  }

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

  const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2d' });

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 2,
  }).json({ success: true, message: 'Logged in', role: user.role });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token').json({ success: true, message: 'Logged out' });
});

// ✅ Mail: Contact
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'anbind2020@gmail.com',
    pass: 'qone uqnq frtp pgny',
  },
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
      <p><strong>Message:</strong><br>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Your message was sent successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Message sending failed' });
  }
});

// ✅ Export app for Vercel
if (process.env.VERCEL) {
  module.exports = app; // ✅ for Vercel
} else {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}
