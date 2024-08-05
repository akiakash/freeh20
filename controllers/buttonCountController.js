// controllers/buttonCountController.js
const ButtonCount = require("../models/buttonCount");

const addButtonCount = async (buttonType, name, email) => {
  try {
    const newCount = new ButtonCount({ buttonType, name, email });
    await newCount.save();
    return newCount;
  } catch (error) {
    console.error("Error adding count:", error); // Log the error for debugging
    throw new Error("Error adding count");
  }
};

const addButtonCountHandler = async (req, res) => {
  const { buttonType, name, email } = req.body;

  try {
    const newCount = await addButtonCount(buttonType, name, email);
    res
      .status(201)
      .send(
        `Count added for ${newCount.buttonType} by ${newCount.name} (${newCount.email})`
      );
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getButtonCounts = async (req, res) => {
  try {
    const counts = await ButtonCount.find({});
    res.json(counts);
  } catch (error) {
    res.status(500).send("Error fetching counts");
  }
};

module.exports = {
  addButtonCountHandler,
  getButtonCounts,
};
