const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
// const User = require('User');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Define User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String },
  password: { type: String },
  role: { type: String, default: 'user' } // default = user
});

const User = mongoose.model('User', UserSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("🌐 ANB Server is running!"));

// 🔐 Signup Route
app.post('/api/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ success: false, message: 'Missing fields' });

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ success: false, message: 'User exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role: 'user' });
    await newUser.save();

    res.json({ success: true, message: 'Signup successful' });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// 🔑 Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    res.json({ success: true, role: user.role });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// Update user role (admin only)
app.put('/api/update-role', async (req, res) => {
  const { username, newRole } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { role: newRole },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'Role updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Role update error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 📧 Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'anbind2020@gmail.com',
    pass: 'qone uqnq frtp pgny' // Gmail App Password
  },
});

// 📮 Quote/Sample/Order mail route
app.post('/api/send-mail', async (req, res) => {
  const { type, name, email, phone, company, address, items } = req.body;

  const itemList = items.map(item =>
    `<li>${item.name} (Qty: ${item.quantity})</li>`
  ).join('');

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

// 📮 Contact form route
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

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
