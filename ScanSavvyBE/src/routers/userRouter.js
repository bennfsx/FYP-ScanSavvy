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
} = require("../controllers/userController");

//Patch
// router.patch("/update", authUser, updateUser);
// router.patch("/update/:id", updateUserById);
router.get("/getuser", getUsers);
router.get("/getuserbyid/:userid", getUserByID);
router.patch("/updateuserbyid/:userid", updateUserByID);
router.patch("/changeuserpassword/:userid", changeUserPassword);

//Delete
// router.delete("/delete/:id", authAdmin, deleteUserById);

module.exports = router;
