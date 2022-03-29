const mssql = require("mssql");
const config = require("../config/db");
const { randomUUID } = require("crypto");
const moment = require("moment");

async function getMessages(req, res) {
  try {
    const pool = await mssql.connect(config);
    const request = await pool.request();

    for (const [key, value] of Object.entries(req.body)) {
      request.input(
        key,
        typeof value == "number" ? mssql.Int : mssql.VarChar,
        value
      );
    }

    const messages = await request.execute("getMessages");
    return res.json({ messages: messages.recordset });
  } catch (error) {
    console.log(error);
  }
}

async function getMessage(req, res) {
  try {
    const pool = await mssql.connect(config);

    const messages = await pool
      .request()
      .input("id", mssql.Int, req.params.id)
      .execute(`getMessage`);
    return res.json({ message: messages.recordset });
  } catch (error) {
    console.log(error);
  }
}

async function addMessage(req, res) {
  try {
    const pool = await mssql.connect(config);
    const now = moment();
    const time = now.format("YYYY-MM-DD hh:mm:ss");

    const result = await pool
      .request()
      .input("name", mssql.VarChar, req.body.name)
      .input("email", mssql.VarChar, req.body.email)
      .input("message", mssql.VarChar, req.body.message)
      .input("date", mssql.VarChar, time)
      .execute("addMessage");

    console.log(result);

    if (result.rowsAffected == 1) {
      return res.json({
        status: true,
      });
    } else {
      return res.json({
        status: false,
        error: "An error occured while sending message. Try again later",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: false,
      error: "An error occured while sending message. Try again later",
    });
  }
}

async function deleteMessage(req, res) {
  try {
    const pool = await mssql.connect(config);

    const result = await pool
      .request()
      .input("id", mssql.VarChar, req.params.id)
      .execute(`deleteParcel`);

    if (result.rowsAffected == 1) {
      return res.json({
        status: true,
      });
    } else {
      return res.json({
        status: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addMessage,
  getMessage,
  getMessages,
  deleteMessage,
};
