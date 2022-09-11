const express = require("express");
const router = express.Router();
const userHandlerControllers = require("../controllers/userHandler.controllers");

// signup route
router.route("/signup").get(userHandlerControllers.createUsers);

// login route
router.route("/login").get();

module.exports = router;
