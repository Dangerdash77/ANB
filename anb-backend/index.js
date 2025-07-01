const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const connectToDB = require("./database/connect");
const routes = require("./routes/routes");
// const userRoutes = require("./routes/userRoutes");
// const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();
const port = 4000;

// Connect to MongoDB
connectToDB(process.env.MONGO_URI);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Important: before routes needing cookies

app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Mail setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'anbind2020@gmail.com',
    pass: 'qone uqnq frtp pgny', // ⚠️ Consider using env var for security
  },
});

// Routes
app.use("/api", routes);
// app.use("/api/users", userRoutes);       // For login, signup, profile update, etc.
// app.use("/api/products", productRoutes); // For product management


// Quote / Sample / Order form mail
app.post('/api/send-mail', async (req, res) => {
  const { type, name, email, phone, company, address, items } = req.body;

  const itemList = items.map(item =>
    `<li>${item.name} (Qty: ${item.quantity})</li>`).join('');
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
    console.error("❌ Mail error:", err);
    res.status(500).json({ success: false, message: 'Mail sending failed' });
  }
});

// Contact Us form mail
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
    console.error("❌ Contact mail error:", err);
    res.status(500).json({ success: false, message: 'Message sending failed' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server started on http://localhost:${port}`);
});
