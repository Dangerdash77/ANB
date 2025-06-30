const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const connectToDB = require("./database/connect");
const routes = require("./routes/routes");

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  "https://www.anbindustries.com",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// ✅ Connect to DB
connectToDB(process.env.MONGO_URI);

// ✅ Mail Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'anbind2020@gmail.com',
    pass: 'qone uqnq frtp pgny',
  },
});

// ✅ API Routes
app.use("/api", routes);

// ✅ Send Mail (Quote/Sample/Order)
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
    console.error("❌ Mail Error:", err);
    res.status(500).json({ success: false, message: 'Mail sending failed' });
  }
});

// ✅ Contact Form Handler
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
    console.error("❌ Contact Error:", err);
    res.status(500).json({ success: false, message: 'Message sending failed' });
  }
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
