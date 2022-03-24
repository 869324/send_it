const nodeMailer = require("nodemailer");
require("dotenv").config();

let transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 587, false for other ports
  requireTLS: true,
  auth: {
    user: "info.sendit.jay@gmail.com",
    pass: "5733Cat#",
  },
});

let mailOptions = {
  from: "info.sendit.jay@gmail.com",
  to: "javankyalo2@gmail.com",
  subject: "Sending Email using Node.js",
  text: "First Email",
  // html:'<h1>Hello User</h1>',
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
