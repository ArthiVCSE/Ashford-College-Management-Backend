const express = require("express");
const router = express.Router();
const progCtrl = require("../Controllers/ProgrammeController");

router.get("/", progCtrl.getAllProgrammes);
router.post("/", progCtrl.createProgramme);
router.delete("/:id", progCtrl.deleteProgramme);

module.exports = router;
