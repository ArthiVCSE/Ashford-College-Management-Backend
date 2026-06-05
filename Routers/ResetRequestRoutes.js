const express = require("express");
const router  = express.Router();
const {
  createRequest,
  getAllRequests,
  getRequestsByEmail,
  updateRequestStatus,
} = require("../Controllers/ResetRequestController");

// POST   /api/reset-requests              → submit a reset request
router.post("/", createRequest);

// GET    /api/reset-requests              → get all requests (Admin)
router.get("/", getAllRequests);

// GET    /api/reset-requests/user/:email  → get requests by user email
router.get("/user/:email", getRequestsByEmail);

// PUT    /api/reset-requests/:id          → approve or reject
router.put("/:id", updateRequestStatus);

module.exports = router;
