const express = require("express");
const userRoutes = express.Router();
const multer = require("multer");
const auth = require("../middleware/auth");
const {
  signup,
  login,
  logout,
  admin,
  updateRole,
  getProfile,
  updateProfile,
} = require("../controllers/userController");


// Setup multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
userRoutes.get("/profile", auth, getProfile);
userRoutes.post("/signup", signup);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout);
userRoutes.get("/admin", admin);
userRoutes.put("/update-role", updateRole);
userRoutes.put("/update-profile", auth, upload.single("photo"), updateProfile); // ✅ added auth

module.exports = userRoutes;
