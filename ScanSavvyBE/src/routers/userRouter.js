const express = require("express");
const router = express.Router();
const {
  authUser,
  authEventOrg,
  authAdmin,
} = require("../middleware/authMiddleware");
const {
  getUsers,
  updateEventOrg,
  getEventOrgById,
} = require("../controllers/userController");

//Patch
// router.patch("/update", authUser, updateUser);
// router.patch("/update/:id", updateUserById);
router.get("/getuser", authUser, getUsers);
router.patch("/updateeventorg/:userid", updateEventOrg);
router.get("/getorganizer/:userid", getEventOrgById);

//Delete
// router.delete("/delete/:id", authAdmin, deleteUserById);

module.exports = router;
