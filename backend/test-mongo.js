// test-mongo.js
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => { console.log("Connected OK"); process.exit(0); })
  .catch(err => { console.error("Connect error:", err); process.exit(1); });