const express = require("express");
const { getUserDetails } = require("../src/userController");
const router = express.Router();

router.get("/getUsers", getUserDetails)

module.exports = router;