const express = require("express");
const router = express.Router();
const {
  authUser,
  authEventOrg,
  authAdmin,
} = require("../middleware/authMiddleware");
const {
  getUsers,

  getUserByID,
  updateUserByID,
  changeUserPassword,
  countUser,
  deleteUserById,
} = require("../controllers/userController");

//Patch
router.get("/getuser", getUsers);
router.get("/getuserbyid/:userid", getUserByID);
router.patch("/updateuserbyid/:userid", updateUserByID);
router.patch("/changeuserpassword/:userid", changeUserPassword);
router.post("/usercount", countUser);

//Delete
router.delete("/deletebyuserid/:userid", deleteUserById);

module.exports = router;
