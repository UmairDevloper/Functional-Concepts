const express = require("express");
const transporter = require("./mailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const upload = require("./multer");

const PORt = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", upload.single("attachment"), async (req, res) => {
  const { name, email, message } = req.body;
  const file = req.file;
  console.log(file);
  
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: "New Message from Contact Form",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    attachments: file
      ? [
          {
            filename: file.originalname,
            path: path.resolve(file.path),
          },
        ]
      : [],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(PORt, () => {
  console.log("Server is running on PORT " + PORt);
});
