const express = require("express");
const app = express();
const cors = require("cors");
const { apiKeyAuth } = require("@vpriem/express-api-key-auth");

const connectDB = require("./utils/connection");
const apiKey = process.env.API_KEY;
const port = 3000;

const usersRoute = require("./routes/users");
const postingRoute = require("./routes/posting");
const loginRoute = require("./routes/login");

connectDB().catch((err) => console.log(err));

// app.use(cors());
const apiKeyMiddleware = apiKeyAuth([apiKey]);
app.use(apiKeyMiddleware);
app.use(express.json());

app.use("/users", usersRoute);
app.use("/posting", postingRoute);
app.use("/login", loginRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
