const express = require("express");
const {
  signup,
  login,
  logout,
  admin,
  updateRole,
} = require("../controllers/userController");
const userRoutes = express.Router();

userRoutes.post("/signup", signup);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout);
userRoutes.get("/admin", admin);
userRoutes.put("/update-role", updateRole);

module.exports = userRoutes;
