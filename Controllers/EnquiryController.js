const Enquiry = require("../Models/EnquiryModel");

// ── CREATE ENQUIRY ────────────────────────────────────────────────
const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const enquiry = new Enquiry({
      name, email, phone, message,
      submittedAt: new Date().toLocaleString(),
    });
    const saved = await enquiry.save();

    res.status(201).json({ message: "Enquiry submitted successfully", data: saved });
  } catch (error) {
    res.status(500).json({ message: "Error submitting enquiry", error: error.message });
  }
};

// ── GET ALL ENQUIRIES ─────────────────────────────────────────────
const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Enquiries fetched", data: enquiries });
  } catch (error) {
    res.status(500).json({ message: "Error fetching enquiries", error: error.message });
  }
};

// ── DELETE ENQUIRY ────────────────────────────────────────────────
const deleteEnquiry = async (req, res) => {
  try {
    const deleted = await Enquiry.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Enquiry not found" });
    res.status(200).json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting enquiry", error: error.message });
  }
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
  deleteEnquiry,
};
