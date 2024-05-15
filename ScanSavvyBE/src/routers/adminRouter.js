const express = require("express");
const router = express.Router();

const { createVendor, getVendor } = require("../controllers/objController");

router.put("/createvendor", createVendor);
router.post("/getvendor", getVendor);

module.exports = router;
