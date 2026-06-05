const mongoose = require("mongoose");

const ResetRequestSchema = new mongoose.Schema({
  email:       { type: String, required: true },
  reason:      { type: String, required: true },
  status:      { type: String, required: true, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  submittedAt: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("ResetRequest", ResetRequestSchema);
