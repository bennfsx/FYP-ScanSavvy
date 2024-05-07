const { Router } = require("express");
const { getUsers } = require("../controller/userController");
const router = Router();

router.get("/getuser", getUsers);

module.exports = {
  getUsers,
};
