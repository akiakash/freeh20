const express = require("express");
const bodyParser = require("body-parser");
const qrCodeController = require("./controllers/qrController");
const cors = require("cors");
const mongoose = require("mongoose");
const {
  getButtonCounts,
  addButtonCountHandler,
} = require("./controllers/buttonCountController");
const { createPerson, getPeople } = require("./controllers/contactInformation");

const app = express();
const port = 4000;

// Use CORS and BodyParser middleware
app.use(cors());
app.use(bodyParser.json());

app.post("/qrcode", qrCodeController.generateQRCode);
app.get("/decode", qrCodeController.decodeQRCode);

// Connect to MongoDB and initialize button counts
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://freeh2o:freeh2o@cluster0.usbkqcl.mongodb.net/buttonCounts"
    );
    console.log("Connected to MongoDB");

    console.log("Button counts initialized");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1); // Exit the process with error
  }
};

// Call MongoDB connection function
connectToMongoDB();

// Define Routes
app.post("/buttons", addButtonCountHandler);
app.get("/buttonCounts", getButtonCounts);
app.post("/contacts", createPerson);
app.get("/contacts", getPeople);

// Start server
app.listen(port, () => {
  console.log(`QR Code Generator listening at http://localhost:${port}`);
});
