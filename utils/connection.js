const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const localhost = "mongodb://127.0.0.1:27017/test";
const mongoUri = process.env.MONGO_URI;
const uri = mongoUri ? mongoUri : localhost;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function connectDB() {
  try {
    await mongoose.connect(uri, connectionParams);
    console.log("DB Connected");
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
}

module.exports = connectDB;
