const Programme = require("../models/ProgrammeModel");

exports.getAllProgrammes = async (req, res) => {
  try {
    const progs = await Programme.find();
    res.status(200).json(progs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProgramme = async (req, res) => {
  try {
    const newProg = new Programme(req.body);
    await newProg.save();
    res.status(201).json(newProg);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProgramme = async (req, res) => {
  try {
    await Programme.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Programme deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
