const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
require("dotenv").config();

const app = express();

// ── MIDDLEWARE ─────────────────────────────────────────────────────
app.use(express.json());
app.use(cors());

// ── ROUTES ────────────────────────────────────────────────────────
const userRoutes         = require("./Routers/UserRoutes");
const markRoutes         = require("./Routers/MarkRoutes");
const attendanceRoutes   = require("./Routers/AttendanceRoutes");
const resetRequestRoutes = require("./Routers/ResetRequestRoutes");
const enquiryRoutes      = require("./Routers/EnquiryRoutes");
const contactRoutes      = require("./Routers/ContactRoutes");
const programmeRoutes    = require("./Routers/ProgrammeRoutes");
const departmentRoutes   = require("./Routers/DepartmentRoutes");

app.use("/api/users",           userRoutes);
app.use("/api/marks",           markRoutes);
app.use("/api/attendance",      attendanceRoutes);
app.use("/api/reset-requests",  resetRequestRoutes);
app.use("/api/enquiries",       enquiryRoutes);
app.use("/api/contacts",        contactRoutes);
app.use("/api/programmes",      programmeRoutes);
app.use("/api/departments",     departmentRoutes);

// ── ROOT HEALTH CHECK ─────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "Ashford University API is running 🚀" });
});

// ── ERROR HANDLING ────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

// ── CONNECT TO MONGODB & START SERVER ─────────────────────────────
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Connection to MongoDB successful");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ Connection to MongoDB FAILED:", err.message);
  });