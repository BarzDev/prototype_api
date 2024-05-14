const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const corsConfig = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PUT"],
};

dotenv.config();

const { apiKeyAuth } = require("@vpriem/express-api-key-auth");

const connectDB = require("./utils/connection");
const apiKey = process.env.API_KEY;

const usersRoute = require("./routes/users");
const postingRoute = require("./routes/posting");
const loginRoute = require("./routes/login");

const apiKeyMiddleware = apiKeyAuth([apiKey]);

app.use(cors(corsConfig));
app.use(apiKeyMiddleware);
app.use(express.json());

app.use("/users", usersRoute);
app.use("/posting", postingRoute);
app.use("/login", loginRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

module.exports = app;
