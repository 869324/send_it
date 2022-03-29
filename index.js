const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", require("./Routes/UserRoutes"));
app.use("/parcels", require("./Routes/ParcelRoutes"));
app.use("/messages", require("./Routes/MessageRoutes"));

app.listen(8000, async () => {
  console.log("Server running");
});
