const mssql = require("mssql");
const config = require("../config/db");
const { randomUUID } = require("crypto");
const moment = require("moment");

async function getParcels(req, res) {
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

    const parcels = await request.execute("getParcels");
    return res.json({ status: true, parcels: parcels.recordset });
  } catch (error) {
    console.log(error);
  }
}

async function getParcel(req, res) {
  try {
    const pool = await mssql.connect(config);

    const parcels = await pool
      .request()
      .input("id", mssql.VarChar, req.params.id)
      .execute(`getParcel`);
    return res.json({ parcel: parcels.recordset });
  } catch (error) {
    console.log(error);
  }
}

async function addParcel(req, res) {
  try {
    const pool = await mssql.connect(config);

    const uuid = randomUUID();

    const parcels = await pool
      .request()
      .input("id", mssql.VarChar, uuid)
      .execute(`getParcel`);

    if (parcels.recordset.length == 0) {
      const now = moment();
      const time = now.format("YYYY-MM-DD hh:mm:ss");

      const result = await pool
        .request()
        .input("id", uuid)
        .input("description", mssql.VarChar, req.body.description)
        .input("sender_id", mssql.VarChar, req.body.sender_id)
        .input("receiver_number", mssql.VarChar, req.body.receiverNumber)
        .input("start_location", mssql.Int, req.body.startLocation)
        .input("end_location", mssql.Int, req.body.endLocation)
        .input("cost", mssql.Int, req.body.cost)
        .input("date_created", mssql.VarChar, time)
        .execute("addParcel");

      if (result.rowsAffected == 1) {
        return res.json({
          status: true,
        });
      } else {
        return res.json({
          status: false,
        });
      }
    } else {
      addParcel(req, res);
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateParcel(req, res) {
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

    const result = await request.execute(`updateParcel`);

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

async function deleteParcel(req, res) {
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

async function getStations(req, res) {
  try {
    const pool = await mssql.connect(config);

    const stations = await pool.request().execute("getStations");
    return res.json({ status: true, stations: stations.recordset });
  } catch (error) {
    console.log(error);
    return res.json({ status: false });
  }
}

module.exports = {
  getParcel,
  getParcels,
  addParcel,
  updateParcel,
  deleteParcel,
  getStations,
};
