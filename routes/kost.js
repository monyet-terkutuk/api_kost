const express = require("express");
const router = express.Router();
const kostHandler = require("./handlers/kost");
const uploadImage = require("../middleware/uploadImage");
const verify = require("../middleware/verify-token");

router.get("/", kostHandler.getAllKost);
router.get("/:kostId", verify, kostHandler.getDetailKost); // Place more specific routes before generic ones
router.post("/", verify, uploadImage.single("imb"), kostHandler.createKost);
router.put(
  "/:kostId",
  verify,
  uploadImage.single("imb"),
  kostHandler.updateKost
);
router.delete("/:kostId", verify, kostHandler.deleteKost);
router.post(
  "/upload/:kostId",
  uploadImage.single("image"),
  kostHandler.uploadImageKost
);

module.exports = router;
