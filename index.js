const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors({origin:'http://localhost:3000'}));
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Setup transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Test endpoint to send email
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject,
      text,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.get('/get-data', async (req,res)=> {
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.end('Hello there');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
