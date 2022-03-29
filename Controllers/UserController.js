const mssql = require("mssql");
const crypto = require("crypto");
const { randomUUID } = require("crypto");
const config = require("../config/db");

async function login(req, res) {
  try {
    const pool = await mssql.connect(config);
    
    const hash = crypto
      .createHash("sha256")
      .update(req.body.password)
      .digest("base64");

    const users = await pool
      .request()
      .input("identity", mssql.VarChar, req.body.identity)
      .execute("login");

    if (users.recordset.length == 0) {
      res.json({ status: false, error: "Invalid email or username" });
    } else if (users.recordset[0].password != hash) {
      res.json({ status: false, error: "Invalid password" });
    } else {
      res.json({ status: true, user: users.recordset[0] });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      error: "An error occured. Try again later",
    });
  }
}

async function getUsers(req, res) {
  try {
    const pool = await mssql.connect(config);

    const products = await pool
      .request()
      .input("page", mssql.Int, req.params.page)
      .execute("getUsers");
    return res.json(products.recordset);
  } catch (error) {
    return res.json({
      status: false,
      error: "An error occured. Try again later",
    });
  }
}

async function getUser(req, res) {
  try {
    const pool = await mssql.connect(config);

    const products = await pool
      .request()
      .input("id", mssql.VarChar, req.params.id)
      .execute(`getUser`);
    return res.json(products.recordset);
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      error: "An error occured. Try again later",
    });
  }
}

async function addUser(req, res) {
  try {
    const pool = await mssql.connect(config);
    const password = req.body.password;
    const hash = crypto.createHash("sha256").update(password).digest("base64");

    const uuid = randomUUID();

    const users1 = await pool
      .request()
      .input("email", mssql.VarChar, req.body.email)
      .input("username", mssql.VarChar, req.body.username)
      .execute("checkUserExistence");

    if (users1.recordset.length == 0) {
      const users2 = await pool
        .request()
        .input("id", mssql.VarChar, uuid)
        .execute(`getUser`);

      if (users2.recordset.length == 0) {
        await pool
          .request()
          .input("id", mssql.VarChar, uuid)
          .input("username", mssql.VarChar, req.body.username)
          .input(
            "fullname",
            mssql.VarChar,
            `${req.body.firstname} ${req.body.lastname}`
          )
          .input("phone", mssql.VarChar, req.body.phone)
          .input("email", mssql.VarChar, req.body.email)
          .input("password", mssql.VarChar, hash)
          .execute("addUser");
        return res.json({
          status: true,
        });
      } else {
        addUser(req, res);
      }
    } else {
      let error = "Another user is already registered with this username";
      if (users1.recordset[0].email == req.body.email) {
        error = "Another user is already registered with this email";
      }

      return res.json({
        status: false,
        error: error,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      error: "An error occured. Try again later",
    });
  }
}

async function updateUser(req, res) {
  try {
    const pool = await mssql.connect(config);

    const request = await pool.request();

    for (const [key, value] of Object.entries(req.body)) {
      if (key == "password") {
        const hash = crypto.createHash("sha256").update(value).digest("base64");
        request.input(key, mssql.VarChar, hash);
      } else {
        request.input(key, mssql.VarChar, value);
      }
    }

    const result = await request.execute(`updateUser`);
    console.log(result);
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
    return res.json({
      status: false,
      error: "An error occured. Try again later",
    });
  }
}

async function deleteUser(req, res) {
  try {
    const pool = await mssql.connect(config);

    const result = await pool
      .request()
      .input("id", mssql.VarChar, req.params.id)
      .execute(`deleteUser`);

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
    return res.json({
      status: false,
      error: "An error occured. Try again later",
    });
  }
}

module.exports = {
  login,
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
