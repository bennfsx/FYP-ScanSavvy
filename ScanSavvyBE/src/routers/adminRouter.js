const express = require("express");
const router = express.Router();

const {
  createVendor,
  getVendor,
  updateVendorByID,
  deleteVendorByID,
  countVendor,
} = require("../controllers/adminController");

router.put("/createvendor", createVendor);
router.post("/getvendor", getVendor);
router.patch("/updatevendorbyid/:siteID", updateVendorByID);
router.delete("/deletevendorbyid/:siteID", deleteVendorByID);
router.post("/vendorcount", countVendor);

module.exports = router;
