const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  accessToken: { type: String },
  photo: {
    data: Buffer,
    contentType: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { username: this.username, role: this.role },
    process.env.JWT_SECRET + "",
    { expiresIn: "2d" }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { username: user.username, role: user.role },
    process.env.JWT_SECRET
  );
};

module.exports = mongoose.model("User", userSchema);
