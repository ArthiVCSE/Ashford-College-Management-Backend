const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  desc:     { type: String, required: true },
  img:      { type: String, default: "" },
  facts:    { type: [String], default: [] },
  ug:       { type: String, default: "" },
  pg:       { type: String, default: "" },
  research: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Department", DepartmentSchema);
