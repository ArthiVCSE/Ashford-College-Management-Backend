const Mark = require("../Models/MarkModel");

// ── CREATE or UPDATE (upsert by studentId + subject) ──────────────
const upsertMark = async (req, res) => {
  try {
    const { studentId, subject, internal, assignment } = req.body;

    if (!studentId || !subject || internal == null || assignment == null) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const int  = Number(internal);
    const asgn = Number(assignment);

    if (int < 0 || int > 25 || asgn < 0 || asgn > 25) {
      return res.status(400).json({ message: "Marks must be between 0 and 25." });
    }

    const total = int + asgn;

    const mark = await Mark.findOneAndUpdate(
      { studentId, subject },
      { studentId, subject, internal: int, assignment: asgn, total },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ message: `Marks saved for ${studentId} — ${subject}.`, data: mark });
  } catch (error) {
    res.status(500).json({ message: "Error saving marks", error: error.message });
  }
};

// ── GET ALL MARKS ─────────────────────────────────────────────────
const getAllMarks = async (req, res) => {
  try {
    const marks = await Mark.find();
    res.status(200).json({ message: "Marks fetched", data: marks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching marks", error: error.message });
  }
};

// ── GET MARKS BY STUDENT EMAIL ────────────────────────────────────
const getMarksByStudent = async (req, res) => {
  try {
    const marks = await Mark.find({ studentId: req.params.email });
    res.status(200).json({ message: "Student marks fetched", data: marks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student marks", error: error.message });
  }
};

// ── DELETE MARK ───────────────────────────────────────────────────
const deleteMark = async (req, res) => {
  try {
    const deleted = await Mark.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Mark entry not found" });
    res.status(200).json({ message: "Mark deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting mark", error: error.message });
  }
};

module.exports = {
  upsertMark,
  getAllMarks,
  getMarksByStudent,
  deleteMark,
};
