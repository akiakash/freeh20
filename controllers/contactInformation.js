// controllers/personController.js
const Person = require("../models/contact");

const createPerson = async (req, res) => {
  const { name, email } = req.body;

  try {
    const person = new Person({ name, email });
    await person.save();
    res.status(201).send(person);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updatePersonAge = async (name, ageIncrement) => {
  try {
    const result = await Person.findOneAndUpdate(
      { name },
      { $inc: { age: ageIncrement } },
      { new: true }
    );
    if (!result) {
      throw new Error("Person not found");
    }
    return result;
  } catch (error) {
    throw new Error("Error updating age");
  }
};

const updatePersonAgeHandler = async (req, res) => {
  const { name } = req.params;
  const { ageIncrement } = req.body;

  try {
    const updatedPerson = await updatePersonAge(name, ageIncrement);
    res.send(`${updatedPerson.name} age updated to ${updatedPerson.age}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getPeople = async (req, res) => {
  try {
    const people = await Person.find({});
    res.json(people);
  } catch (error) {
    res.status(500).send("Error fetching people");
  }
};

module.exports = {
  createPerson,
  updatePersonAgeHandler,
  getPeople,
};
