const mongoose = require("mongoose");

const MarkSchema = new mongoose.Schema({
  studentId:  { type: String, required: true },   // student's officialEmail
  subject:    { type: String, required: true },
  internal:   { type: Number, required: true, min: 0, max: 25 },
  assignment: { type: Number, required: true, min: 0, max: 25 },
  total:      { type: Number, required: true, min: 0, max: 50 },
}, { timestamps: true });

// One mark entry per student per subject
MarkSchema.index({ studentId: 1, subject: 1 }, { unique: true });

module.exports = mongoose.model("Mark", MarkSchema);
