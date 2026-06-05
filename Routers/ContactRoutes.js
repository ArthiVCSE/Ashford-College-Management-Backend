const express = require("express");
const router  = express.Router();
const {
  createContact,
  getAllContacts,
  deleteContact,
} = require("../Controllers/ContactController");

// POST   /api/contacts        → submit contact message
router.post("/", createContact);

// GET    /api/contacts        → get all contacts
router.get("/", getAllContacts);

// DELETE /api/contacts/:id    → delete contact
router.delete("/:id", deleteContact);

module.exports = router;
