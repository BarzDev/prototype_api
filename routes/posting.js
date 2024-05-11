const express = require("express");
const router = express.Router();

const Posting = require("../models/posting");

router.get("/", async (req, res) => {
  try {
    const posts = await Posting.find();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, content } = req.body;
    const posting = new Posting({ username, content });
    await posting.save();
    res.status(201).json({ message: "posting created successfully", posting });
  } catch (error) {
    console.error("Error creating posting:", error);
    res.status(500).json({ message: "internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const postingId = req.params.id;
    const deletedPosting = await Posting.findByIdAndDelete(postingId);
    if (deletedPosting) {
      res.json({ message: "Posting deleted successfully", deletedPosting });
    } else {
      res.status(404).json({ message: "Posting not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
