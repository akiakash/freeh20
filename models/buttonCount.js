// models/buttonCount.js
const mongoose = require("mongoose");

const buttonCountSchema = new mongoose.Schema({
  buttonType: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ButtonCount = mongoose.model("ButtonCount", buttonCountSchema);

module.exports = ButtonCount;
