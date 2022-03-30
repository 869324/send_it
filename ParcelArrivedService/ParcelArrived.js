const mssql = require("mssql");
const config = require("../Config/db");
require("dotenv").config();

const credentials = {
  apiKey: process.env.africasKey,
  username: process.env.africasUsername,
};

const africasTalking = require("africastalking")(credentials);

module.exports = {
  arriveParcel: async () => {
    const pool = await mssql.connect(config);

    const data = await pool
      .request()
      .query(
        "select id, description, sender_id, start_location, end_location, receiver_number from parcels where isDelivered = 'true' and isUpdatedArrive = 'false'"
      );

    for (item of data.recordset) {
      console.log(item);
      const result = await pool
        .request()
        .input("id", mssql.VarChar, item.sender_id)
        .execute("getUser");

      const user = result.recordset[0];

      const station1 = await pool
        .request()
        .input("id", mssql.Int, item.end_location)
        .execute("getStation");

      const to = station1.recordset[0].name;
      const sms = africasTalking.SMS;
      const message = {
        to: `+254${item.receiver_number}`,
        message: `A parcel of ${item.description} sent by ${user.fullname} : ${user.phone} has arrived at ${to}. Visit the station for collection`,
      };
      console.log(message);

      sms
        .send(message)
        .then(async (res) => {
          await pool
            .request()
            .input("id", mssql.VarChar, item.id)
            .input("isUpdatedArrive", mssql.VarChar, "true")
            .execute("updateParcel");
          console.log(`Message sent to ${message.to}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
