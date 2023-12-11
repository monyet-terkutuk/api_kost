const express = require("express");
const router = express.Router();
const userHandler = require("./handlers/kost");
const uploadImage = require("../middleware/uploadImage");

router.get("/", userHandler.getAllUsers);
router.post(
  "/",
  uploadImage.array("images", 10),
  uploadImage.single("images"),
  userHandler.createKost
);
router.put("/:id", uploadImage.single("image_profile"), userHandler.updateUser);
router.delete("/:id", userHandler.deleteUser);

module.exports = router;
