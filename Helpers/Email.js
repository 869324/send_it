const nodemailer = require("nodemailer");
require("dotenv").config();

function createTransporter(config) {
  const transporter = nodemailer.createTransport(config);
  return transporter;
}

const defaultConfig = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 587, false for other ports
  requireTLS: true,
  auth: {
    user: "info.sendit.jay@gmail.com",
    pass: "5733Cat#",
  },
};

module.exports = {
  sendMail: async (email) => {
    const transporter = createTransporter(defaultConfig);
    await transporter.verify();
    await transporter.sendMail(email, (error, info) => {
      if (error) {
        console.log("Error");
      } else {
        console.log(`Email sent to ${email.to}`);
      }
    });
  },
};
