const ResetRequest = require("../Models/ResetRequestModel");

// ── CREATE RESET REQUEST ──────────────────────────────────────────
const createRequest = async (req, res) => {
  try {
    const { email, reason } = req.body;

    if (!email || !reason) {
      return res.status(400).json({ message: "Email and reason are required." });
    }

    // Check for existing pending request
    const existing = await ResetRequest.findOne({ email, status: "Pending" });
    if (existing) {
      return res.status(409).json({
        message: "A pending request already exists for this email. Please wait for Admin approval.",
      });
    }

    const request = new ResetRequest({
      email,
      reason,
      status: "Pending",
      submittedAt: new Date().toLocaleString(),
    });
    const saved = await request.save();

    res.status(201).json({ message: "Reset request submitted successfully", data: saved });
  } catch (error) {
    res.status(500).json({ message: "Error creating reset request", error: error.message });
  }
};

// ── GET ALL REQUESTS (Admin) ──────────────────────────────────────
const getAllRequests = async (req, res) => {
  try {
    const requests = await ResetRequest.find();
    res.status(200).json({ message: "Requests fetched", data: requests });
  } catch (error) {
    res.status(500).json({ message: "Error fetching requests", error: error.message });
  }
};

// ── GET REQUESTS BY USER EMAIL ────────────────────────────────────
const getRequestsByEmail = async (req, res) => {
  try {
    const requests = await ResetRequest.find({ email: req.params.email });
    res.status(200).json({ message: "User requests fetched", data: requests });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user requests", error: error.message });
  }
};

// ── UPDATE REQUEST STATUS (Admin approves / rejects) ──────────────
const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;   // "Approved" or "Rejected"

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Status must be Approved or Rejected." });
    }

    const updated = await ResetRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Request not found" });

    res.status(200).json({ message: `Request ${status.toLowerCase()} successfully`, data: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating request", error: error.message });
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  getRequestsByEmail,
  updateRequestStatus,
};
