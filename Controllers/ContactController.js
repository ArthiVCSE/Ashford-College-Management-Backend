const Contact = require("../Models/ContactModel");

// ── CREATE CONTACT MESSAGE ────────────────────────────────────────
const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const contact = new Contact({
      name, email, phone, message,
      submittedAt: new Date().toLocaleString(),
    });
    const saved = await contact.save();

    res.status(201).json({ message: "Contact message sent successfully", data: saved });
  } catch (error) {
    res.status(500).json({ message: "Error sending contact message", error: error.message });
  }
};

// ── GET ALL CONTACTS ──────────────────────────────────────────────
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Contacts fetched", data: contacts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts", error: error.message });
  }
};

// ── DELETE CONTACT ────────────────────────────────────────────────
const deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact", error: error.message });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  deleteContact,
};
