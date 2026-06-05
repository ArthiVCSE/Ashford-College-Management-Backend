const express = require("express");
const router = express.Router();
const deptCtrl = require("../Controllers/DepartmentController");

router.get("/", deptCtrl.getAllDepartments);
router.post("/", deptCtrl.createDepartment);
router.delete("/:id", deptCtrl.deleteDepartment);

module.exports = router;
