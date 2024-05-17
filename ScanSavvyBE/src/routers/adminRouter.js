const express = require("express");
const router = express.Router();

const {
  createVendor,
  getVendor,
  updateVendorByID,
  deleteVendorByID,
} = require("../controllers/objController");

router.put("/createvendor", createVendor);
router.post("/getvendor", getVendor);
router.patch("/updatevendorbyid/:siteID", updateVendorByID);
router.delete("/deletevendorbyid/:siteID", deleteVendorByID);

module.exports = router;
