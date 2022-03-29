const express = require("express");
const router = express.Router();
const controller = require("../Controllers/ParcelController");

router.post("/getParcels", controller.getParcels);
router.get("/getAparcel/:id", controller.getParcel);
router.post("/addParcel", controller.addParcel);
router.put("/updateParcel", controller.updateParcel);
router.delete("/deleteParcel/:id", controller.deleteParcel);
router.get("/getStations", controller.getStations);

module.exports = router;
