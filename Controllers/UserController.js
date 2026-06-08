const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");

// ── ADMIN CREDENTIALS (hardcoded, matches frontend) ───────────────
const ADMIN_EMAIL = "admin@ford.edu.in";
const ADMIN_PASSWORD = "Admin@123";

// ── LOGIN ─────────────────────────────────────────────────────────
const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Admin check (hardcoded)
    if (role === "Admin" && email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return res.status(200).json({
        message: "Admin login successful",
        data: { officialEmail: ADMIN_EMAIL, role: "Admin", name: "Administrator" },
      });
    }

    // Student / Faculty check
    const user = await User.findOne({ officialEmail: email, role });
    if (!user) {
      return res.status(401).json({ message: "Invalid email, password or role." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email, password or role." });
    }

    res.status(200).json({
      message: "Login successful",
      data: {
        _id: user._id,
        name: user.name,
        role: user.role,
        dept: user.dept,
        prog: user.prog,
        year: user.year,
        personalEmail: user.personalEmail,
        officialEmail: user.officialEmail,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// ── CREATE USER (Admin adds Student / Faculty) ────────────────────
const createUser = async (req, res) => {
  try {
    const { name, role, dept,profileImg, prog, year, personalEmail, officialEmail, password } = req.body;

    if (!name || !role || !officialEmail || !password) {
      return res.status(400).json({ message: "Name, Role, Official Email and Password are required." });
    }

    // Check duplicate
    const existing = await User.findOne({ officialEmail });
    if (existing) {
      return res.status(409).json({ message: "A user with this official email already exists." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = new User({
      name, role, dept, profileImg, prog, year, personalEmail, officialEmail, password: hashed,
    });
    const saved = await newUser.save();

    res.status(201).json({ message: `${role} "${name}" added successfully.`, data: saved });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

// ── GET ALL USERS (optional ?role= filter) ────────────────────────
const getUsers = async (req, res) => {
  try {
    const filter = {};
    if (req.query.role) filter.role = req.query.role;

    const users = await User.find(filter).select("-password");
    res.status(200).json({ message: "Users fetched", data: users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// ── GET ONE USER ──────────────────────────────────────────────────
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User fetched", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};

// ── UPDATE USER (Admin edits) ─────────────────────────────────────
const updateUser = async (req, res) => {
  try {
    const { name, dept, officialEmail, password } = req.body;
    const updateData = { name, dept, officialEmail };

    // Only update password if a new one is provided (min 6 chars)
    if (password && password.length >= 6) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updated = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select("-password");
    if (!updated) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

// ── DELETE USER ───────────────────────────────────────────────────
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

// ── RESET PASSWORD (by email) ─────────────────────────────────────
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required." });
    }

    const user = await User.findOne({ officialEmail: email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error: error.message });
  }
};

module.exports = {
  loginUser,
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  resetPassword,
};