const express = require("express");
const router  = express.Router();
const {
  upsertMark,
  getAllMarks,
  getMarksByStudent,
  deleteMark,
} = require("../Controllers/MarkController");

// POST   /api/marks                    → create or update mark
router.post("/", upsertMark);

// GET    /api/marks                    → get all marks
router.get("/", getAllMarks);

// GET    /api/marks/student/:email     → get marks by student email
router.get("/student/:email", getMarksByStudent);

// DELETE /api/marks/:id                → delete mark entry
router.delete("/:id", deleteMark);

module.exports = router;
