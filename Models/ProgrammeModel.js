const mongoose = require("mongoose");

const ProgrammeSchema = new mongoose.Schema({
  title:  { type: String, required: true },
  desc:   { type: String, required: true },
  img:    { type: String, default: "" },
  points: { type: [String], default: [] },
  type:   { type: String, required: true, enum: ["Engineering", "Management"] }
}, { timestamps: true });

module.exports = mongoose.model("Programme", ProgrammeSchema);
