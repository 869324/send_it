const express = require("express");
const cron = require("node-cron");
const { mailer } = require("./RegistrationService/Registration");
const { sentParcel } = require("./ParcelSentService/ParcelSent");
const { arriveParcel } = require("./ParcelArrivedService/ParcelArrived");

const app = express();

app.listen(5000, () => {
  console.log("Background Service running: 5000");
  cron.schedule("*/5 * * * * *", () => {
    mailer();
    sentParcel();
    arriveParcel();
  });
});
