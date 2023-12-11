const express = require("express");
const router = express.Router();
const authHandler = require("./handlers/auth");
const uploadImage = require("../middleware/uploadImage");

router.post("/register", authHandler.register);
router.post("/login", authHandler.login);

module.exports = router;
