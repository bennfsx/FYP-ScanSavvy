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
} = require("../controllers/userController");

//Patch
// router.patch("/update", authUser, updateUser);
// router.patch("/update/:id", updateUserById);
router.get("/getuser", getUsers);
router.get("/getuserbyid/:userid", getUserByID);

//Delete
// router.delete("/delete/:id", authAdmin, deleteUserById);

module.exports = router;
