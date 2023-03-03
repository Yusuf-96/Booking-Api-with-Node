const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const hotelsRoute = require("./routes/hotels");
const roomsRoute = require("./routes/rooms");

dotenv.config();

const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Mongo db");
  } catch (error) {
    console.log("Network erros occured");
    throw error;
  }
};

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  connect();
  console.log(`Server is Running on localhost:${port}`);
});
