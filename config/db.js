const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.MONGODB_URI;

mongoose.connect(mongoUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB!");
});
