const express = require("express");
const router = express.Router();

const {
  createUserFavorites,
  getUserFavoritesByUserID,
  userHistory,
} = require("../controllers/homeController");

router.put("/visit", userHistory);
router.put("/createuserfav/:userID", createUserFavorites);
router.post("/getuserfav/:userID", getUserFavoritesByUserID);

module.exports = router;
