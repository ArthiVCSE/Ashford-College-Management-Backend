const express = require("express");
const router  = express.Router();
const {
  loginUser,
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  resetPassword,
} = require("../Controllers/UserController");

// POST   /api/users/login           → authenticate
router.post("/login", loginUser);

// POST   /api/users                 → create new user
router.post("/", createUser);

// GET    /api/users                 → get all users (?role=Student)
router.get("/", getUsers);

// GET    /api/users/:id             → get single user
router.get("/:id", getUserById);

// PUT    /api/users/:id             → update user
router.put("/:id", updateUser);

// DELETE /api/users/:id             → delete user
router.delete("/:id", deleteUser);

// PUT    /api/users/reset-password  → update password by email
router.put("/reset-password/update", resetPassword);

module.exports = router;
