const express = require("express");
const router = express.Router();
const Person = require("./../models(schema)/person");

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();

    console.log("fetched data");

    res.status(200).json(data); // ✅ Send the saved document
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);

    const savedPerson = await newPerson.save();

    console.log("response saved", savedPerson);

    res.status(200).json(savedPerson); // ✅ Send the saved document
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/:stateType", async (req, res) => {
    try {
      const stateType = req.params.stateType;
      console.log("Requested State:", stateType); // Debugging
  
      const response = await Person.find({ "address.state": stateType });
      
      console.log("Response:", response); // Debugging
      res.status(200).json(response); // ✅ Send filtered data
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const personId = req.params.id;
      const updatePersonData = req.body;

      const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
        new: true,
        runValidators: true
      })

      if(!response){
        console.log("Person not found!"); // Debugging
        return res.status(404).json({ error: "person not found" });
      }
      
      console.log("data updated:"); // Debugging
      res.status(200).json(response); // ✅ Send filtered data


    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const personId = req.params.id;

      const response = await Person.findByIdAndDelete(personId)

      if(!response){
        console.log("Person not found!"); // Debugging
        return res.status(404).json({ error: "person not found" });
      }
      
      console.log("person data deleted:"); // Debugging
      res.status(200).json(response); // ✅ Send filtered data


    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });
  

module.exports = router;
