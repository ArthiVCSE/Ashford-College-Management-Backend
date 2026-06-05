const Attendance = require("../Models/AttendanceModel");

// ── CREATE or UPDATE (upsert by student + date) ───────────────────
const upsertAttendance = async (req, res) => {
  try {
    const { student, date, status } = req.body;

    if (!student || !date) {
      return res.status(400).json({ message: "Student and date are required." });
    }

    const record = await Attendance.findOneAndUpdate(
      { student, date },
      { student, date, status: status || "Present" },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ message: `${student} marked ${status} on ${date}.`, data: record });
  } catch (error) {
    res.status(500).json({ message: "Error saving attendance", error: error.message });
  }
};

// ── GET ALL ATTENDANCE ────────────────────────────────────────────
const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().sort({ date: -1 });
    res.status(200).json({ message: "Attendance fetched", data: records });
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance", error: error.message });
  }
};

// ── GET ATTENDANCE BY STUDENT ─────────────────────────────────────
const getAttendanceByStudent = async (req, res) => {
  try {
    const records = await Attendance.find({ student: req.params.email }).sort({ date: -1 });
    res.status(200).json({ message: "Student attendance fetched", data: records });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student attendance", error: error.message });
  }
};

// ── DELETE ATTENDANCE ─────────────────────────────────────────────
const deleteAttendance = async (req, res) => {
  try {
    const deleted = await Attendance.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Attendance record not found" });
    res.status(200).json({ message: "Attendance deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting attendance", error: error.message });
  }
};

module.exports = {
  upsertAttendance,
  getAllAttendance,
  getAttendanceByStudent,
  deleteAttendance,
};
