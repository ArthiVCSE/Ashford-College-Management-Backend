const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true, enum: ["Student", "Faculty"] },
  dept: { type: String, default: "" },
  prog: { type: String, default: "" },
  year: { type: String, default: "" },
  personalEmail: { type: String, default: "" },
  officialEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Faculty specific fields
  profileImg: { type: String, default: "" },
  designation: { type: String, default: "" },
  description: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);