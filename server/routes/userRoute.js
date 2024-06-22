const express = require("express");
const {
  getUserDetails,
  addUser,
  editUser,
  deleteUser,
  getUserById
} = require("../src/userController");
const userRouter = express.Router();

userRouter.get("/getUsers", getUserDetails);
userRouter.get("/getUserById/:id", getUserById);
userRouter.post("/addUser", addUser);
userRouter.post("/editUser/:id", editUser);
userRouter.post("/deleteUser/:id", deleteUser);

module.exports = { userRouter };
