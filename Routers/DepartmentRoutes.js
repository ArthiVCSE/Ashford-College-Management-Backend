const express = require("express");
const router = express.Router();
const deptCtrl = require("../controllers/DepartmentController");

router.get("/", deptCtrl.getAllDepartments);
router.post("/", deptCtrl.createDepartment);
router.delete("/:id", deptCtrl.deleteDepartment);

module.exports = router;
