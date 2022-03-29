const express = require("express");
const router = express.Router();
const controller = require("../Controllers/UserController");

router.post("/login", controller.login);
router.get("/getUsers/:page", controller.getUsers);
router.get("/getAUser/:id", controller.getUser);
router.post("/addUser/", controller.addUser);
router.put("/updateUser/", controller.updateUser);
router.delete("/deleteUser/:id", controller.deleteUser);

module.exports = router;
