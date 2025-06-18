const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy login data
const users = [
  { username: 'owner', password: '123456', role: 'owner' },
  { username: 'manager', password: '123456', role: 'manager' },
  { username: 'employee', password: '123456', role: 'employee' },
];

// Login route
app.post('https://anb-nuis.vercel.app/api/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true, role: user.role });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

// Email transporter config
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'manavkalola1612@gmail.com',           // ✅ Your Gmail
    pass: 'ofvo vqpu qfyu szbw',                 // ✅ App password (not Gmail password)
  },
});

// Quote/Sample/Order mail route
app.post('https://anb-nuis.vercel.app/api/send-mail', async (req, res) => {
  const { type, name, email, phone, company, address, items } = req.body;

  const itemList = items.map(item =>
    `<li>${item.name} (Qty: ${item.quantity})</li>`
  ).join('');

  const addressLine = address ? `<p><strong>Address:</strong> ${address}</p>` : '';

  const mailOptions = {
    from: 'manavkalola1612@gmail.com',
    to: 'kalola.manav2022@vitstudent.ac.in',
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
    console.error('Error sending mail:', err);
    res.status(500).json({ success: false, message: 'Mail sending failed' });
  }
});

// ✅ Contact form route
app.post('https://anb-nuis.vercel.app/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
  }

  const mailOptions = {
    from: 'manavkalola1612@gmail.com',
    to: 'kalola.manav2022@vitstudent.ac.in',
    subject: `Contact Us Message from ${name}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <br></br>
      <p><h3><strong>Subject:</strong> ${subject} </h3></p>
      <p><strong>Message:</strong> <br>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Your message was sent successfully!' });
  } catch (err) {
    console.error('Error sending contact message:', err);
    res.status(500).json({ success: false, message: 'Message sending failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
