const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const { signin, refresh, signup } = require("../controllers/authController");

//Signup Endpoint
router.put("/signup", signup);

//Signin Endpoint
router.post("/signin", signin);

//refresh Endpoint
router.post("/refresh", refresh);

module.exports = router;
