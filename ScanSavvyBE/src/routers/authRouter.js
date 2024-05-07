const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  signin,
  refresh,
  signupAtt,
  signupOrg,
} = require("../controllers/authController");

//Signup Endpoint
router.put("/signupAtt", signupAtt);
router.put("/signupOrg", signupOrg);

//Signin Endpoint
router.post("/signin", signin);

//refresh Endpoint
router.post("/refresh", refresh);

module.exports = router;
