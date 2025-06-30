const User = require("../models/User");

async function generateTokens(user) {
    user.accessToken = user.generateAccessToken();

    await user.save({validateBeforeSave: false});
    return {
        accessToken: user.accessToken,
    }
}
async function signup(req, res) {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "Username already exists" });
  }

  const newUser = new User({ username, email, password });
  await newUser.save();

  res.json({ success: true, message: "Signup successful" });
}
async function login(req, res) {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });

  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch)
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });


    const { accessToken } = await generateTokens(user);
  res
    .cookie("token", accessToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    //   secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 2,
    })
    .json({ success: true, message: "Logged in", role: user.role });
}
async function logout(req, res) {
  res.clearCookie("token").json({ success: true, message: "Logged out" });
}
async function admin(req, res) {
  if (req.user.role !== "owner")
    return res.status(403).json({ message: "Forbidden" });
  res.json({ message: "Hello Admin!" });
}
async function updateRole(req, res) {
  const { username, newRole } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { role: newRole },
      { new: true }
    );
    if (!updatedUser)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.json({ success: true, message: "Role updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = { signup, login, logout, admin, updateRole };
