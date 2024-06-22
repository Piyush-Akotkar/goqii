const express = require("express");
const {
  getUserDetails,
  addUser,
  editUser,
  deleteUser,
} = require("../src/userController");
const userRouter = express.Router();

userRouter.get("/getUsers", getUserDetails);
userRouter.get("/addUser", addUser);
userRouter.get("/editUser/:id", editUser);
userRouter.get("/deleteUser/:id", deleteUser);

module.exports = { userRouter };
