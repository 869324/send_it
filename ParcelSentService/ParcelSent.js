const mssql = require("mssql");
const config = require("../Config/db");
require("dotenv").config();

const credentials = {
  apiKey: process.env.africasKey,
  username: process.env.africasUsername,
};

const africasTalking = require("africastalking")(credentials);

module.exports = {
  sentParcel: async () => {
    const pool = await mssql.connect(config);

    const data = await pool
      .request()
      .query(
        "select id, description, sender_id, start_location, end_location from parcels where isSent = 'true' and isUpdatedSend = 'false'"
      );

    for (item of data.recordset) {
      const result = await pool
        .request()
        .input("id", mssql.VarChar, item.sender_id)
        .execute("getUser");

      const user = result.recordset[0];

      const station1 = await pool
        .request()
        .input("id", mssql.Int, item.start_location)
        .execute("getStation");

      const station2 = await pool
        .request()
        .input("id", mssql.Int, item.end_location)
        .execute("getStation");

      const from = station1.recordset[0].name;
      const to = station2.recordset[0].name;
      const sms = africasTalking.SMS;
      const message = {
        to: `+254${[...user.phone].slice(1, 10).join("")}`,
        message: `Hello ${user.fullname}, your parcel of ${item.description} has departed from ${from} to ${to}. We will update you on arrival`,
      };
      //console.log(message);

      sms
        .send(message)
        .then(async (res) => {
          await pool
            .request()
            .input("id", mssql.VarChar, item.id)
            .input("isUpdatedSend", mssql.VarChar, "true")
            .execute("updateParcel");
          console.log(`Message sent to ${message.to}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
