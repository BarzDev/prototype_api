const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const localhost = "mongodb://127.0.0.1:27017/test";
const mongoUri = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(mongoUri ? mongoUri : localhost);
    console.log("DB Connected");
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
}

module.exports = connectDB;
