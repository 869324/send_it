const cron = require("node-cron");
const { mailer } = require("../EmailService/Email");

function run() {
  cron.schedule("* * * * *", () => {
    mailer();
  });
}

run();
