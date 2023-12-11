const express = require("express");
const router = express.Router();
const userHandler = require("./handlers/users");
const uploadImage = require("../middleware/uploadImage");

// Get all users data
router.get("/", userHandler.getAllUsers);
router.post("/", userHandler.createUser);
router.put("/:id", uploadImage.single("image_profile"), userHandler.updateUser);
router.delete("/:id", userHandler.deleteUser);

module.exports = router;
