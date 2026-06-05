const express = require("express");
const router  = express.Router();
const {
  createEnquiry,
  getAllEnquiries,
  deleteEnquiry,
} = require("../Controllers/EnquiryController");

// POST   /api/enquiries        → submit enquiry
router.post("/", createEnquiry);

// GET    /api/enquiries        → get all enquiries
router.get("/", getAllEnquiries);

// DELETE /api/enquiries/:id    → delete enquiry
router.delete("/:id", deleteEnquiry);

module.exports = router;
