const express = require("express");
const router  = express.Router();
const {
  upsertAttendance,
  getAllAttendance,
  getAttendanceByStudent,
  deleteAttendance,
} = require("../Controllers/AttendanceController");

// POST   /api/attendance                    → create or update attendance
router.post("/", upsertAttendance);

// GET    /api/attendance                    → get all records
router.get("/", getAllAttendance);

// GET    /api/attendance/student/:email     → get by student email
router.get("/student/:email", getAttendanceByStudent);

// DELETE /api/attendance/:id                → delete record
router.delete("/:id", deleteAttendance);

module.exports = router;
