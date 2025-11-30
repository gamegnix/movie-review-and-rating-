const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  theme: { type: String, enum: ["light", "dark"], default: "light" },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("User", UserSchema);
