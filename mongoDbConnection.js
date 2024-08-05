// // mongodbConnection.js
// const mongoose = require("mongoose");
// const {
//   initializeButtonCounts,
// } = require("./controllers/buttonCountController");

// const connectToMongoDB = async () => {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://freeh2o:freeh2o@cluster0.usbkqcl.mongodb.net/buttonCounts"
//     );
//     console.log("Connected to MongoDB");
//     // Initialize button counts after successful connection
//     await initializeButtonCounts();
//     console.log("Button counts initialized");
//   } catch (err) {
//     console.error("Error connecting to MongoDB", err);
//     throw err; // Re-throw to handle it later
//   }
// };

// module.exports = connectToMongoDB;
