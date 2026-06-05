const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  student: { type: String, required: true },   // student's officialEmail
  date:    { type: String, required: true },   // YYYY-MM-DD
  status:  { type: String, required: true, enum: ["Present", "Absent", "Late"] },
}, { timestamps: true });

// One record per student per date
AttendanceSchema.index({ student: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", AttendanceSchema);
