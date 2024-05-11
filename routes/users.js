const express = require("express");
const router = express.Router();

const User = require("../models/user");
const bcryptUtils = require("../utils/bcrypt");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
    // console.log("GET users at", new Date().toISOString());
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcryptUtils.hashPassword(password);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "username already exist" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (deletedUser) {
      res.json({ message: "User deleted successfully", deletedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, password } = req.body;
    const hashedPassword = await bcryptUtils.hashPassword(password);

    const updatedUserData = { username, password: hashedPassword };
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });

    if (updatedUser) {
      res.json({ message: "User updated successfully", updatedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
