const { sendMail } = require("../Helpers/Email");
const ejs = require("ejs");
const mssql = require("mssql");
const config = require("../Config/db");
require("dotenv").config();

module.exports = {
  mailer: async () => {
    try {
      const pool = await mssql.connect(config);
      const users = await pool
        .request()
        .query(
          "select * from users where isSent = 'true' and isDeleted = 'false' and username = 'javan' "
        );

      for (let user of users.recordsets[0]) {
        const { id, email } = user;

        ejs.renderFile(
          "templates/Registration.ejs",
          { email },
          async (error, data) => {
            if (error) return console.log(error);

            const message = {
              from: {
                name: "Send It",
                address: process.env.EMAIL,
              },
              to: email,
              subject: "Welcome to Send It",
              html: data,
            };

            try {
              await sendMail(message);

              await pool
                .request()
                .input("id", mssql.VarChar, id)
                .input("isSent", mssql.VarChar, "true")
                .execute("updateUser");

              console.log(`Email sent to ${email}`);
            } catch (error) {
              console.log(error);
            }
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
};
