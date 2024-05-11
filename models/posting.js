const mongoose = require("mongoose");

const postingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Posting = mongoose.model("Posting", postingSchema);

module.exports = Posting;
