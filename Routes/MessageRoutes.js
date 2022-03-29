const express = require("express");
const router = express.Router();
const controller = require("../Controllers/MessageController");

router.post("/addMessage", controller.addMessage);
router.get("/getMessage/:id", controller.getMessage);
router.get("/getMessages", controller.getMessages);
router.delete("/deleteMessage/:id", controller.deleteMessage);

module.exports = router;
