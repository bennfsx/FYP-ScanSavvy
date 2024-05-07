const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  authAdmin,
  authEventOrg,
  authEventAttendee,
} = require("../middleware/authMiddleware");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
  uploadToGCP,
  createEvent,
  getAllEvent,
  deleteEventById,
  updateEventById,
  uploadAsset,
  getEventById,
  reserveEventById,
} = require("../controllers/eventController");

//Patch
// router.patch("/update", authUser, updateUser);
// router.patch("/update/:id", updateUserById);

router.put("/createevent", authEventOrg, createEvent);
router.post("/getallevent", getAllEvent);
router.delete("/deleteevent/:eventId", authAdmin, deleteEventById);
router.patch("/updatebyid/:eventId", updateEventById);
router.post("/geteventbyid/:eventId", getEventById);
router.put("/reserveeventbyid/:eventId", reserveEventById);
router.post("/upload-image/:eventid", upload.single("image"), uploadAsset);

//Delete
// router.delete("/delete/:id", authAdmin, deleteUserById);

module.exports = router;
