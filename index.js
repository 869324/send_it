const bodyParser = require("body-parser");
const express = require("express");
const cron = require("node-cron");
const { mailer } = require("./EmailService/Email");

const app = express();

app.listen(5000, () => {
  console.log("Background Service running: 5000");
  cron.schedule("*/5 * * * * *", () => {
    mailer();
  });
});
