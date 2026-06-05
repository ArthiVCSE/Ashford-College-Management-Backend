const Department = require("../models/DepartmentModel");

exports.getAllDepartments = async (req, res) => {
  try {
    const depts = await Department.find();
    res.status(200).json(depts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const newDept = new Department(req.body);
    await newDept.save();
    res.status(201).json(newDept);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Department deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
