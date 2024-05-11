const express = require("express");
const router = express.Router();

const User = require("../models/user");
const bcryptUtils = require("../utils/bcrypt");

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const isPasswordValid = await bcryptUtils.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
