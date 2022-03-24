const nodemailer = require("nodemailer");
require("dotenv").config();

function createTransporter(config) {
  const transporter = nodemailer.createTransport(config);
  return transporter;
}

const defaultConfig = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTls: true,
  auth: {
    email: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
};

module.exports = {
  sendMail: async (email) => {
    const transporter = createTransporter(defaultConfig);
    await transporter.verify();
    await transporter.sendMail(email, (error, info) => {
      if (error) {
        console.log("Error");
      }
    });
  },
};
