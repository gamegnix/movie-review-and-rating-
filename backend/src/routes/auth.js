const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();

// helper to remove password from user object
const sanitizeUser = (user) => {
  const userObj = user.toObject ? user.toObject() : user;
  const { passwordHash, __v, ...sanitized } = userObj;
  return sanitized;
};

// check if email is valid format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// check password length
const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// Register endpoint
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!isValidPassword(password)) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    // check if email already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      email: email.toLowerCase(),
      passwordHash,
      name: name || "",
    });

    // generate token
    const secret = process.env.JWT_SECRET || "your-secret-key-change-in-production";
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      secret,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: sanitizeUser(user),
      token,
    });
  } catch (err) {
    console.error("Register error:", err);
    
    // handle duplicate email error
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    
    res.status(500).json({ error: "Server error during registration" });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // check password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // create token
    const secret = process.env.JWT_SECRET || "your-secret-key-change-in-production";
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      secret,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      user: sanitizeUser(user),
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

// Get current user (protected)
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      user: sanitizeUser(user),
    });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update profile (protected)
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const { name, theme } = req.body;
    const updates = {};

    if (name !== undefined) {
      updates.name = name;
    }

    if (theme !== undefined) {
      if (!["light", "dark"].includes(theme)) {
        return res.status(400).json({ error: "Theme must be 'light' or 'dark'" });
      }
      updates.theme = theme;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: sanitizeUser(user),
    });
  } catch (err) {
    console.error("Update profile error:", err);
    
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    
    res.status(500).json({ error: "Server error during profile update" });
  }
});

// Change password (protected)
router.put("/password", authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Current password and new password are required" });
    }

    if (!isValidPassword(newPassword)) {
      return res
        .status(400)
        .json({ error: "New password must be at least 6 characters long" });
    }

    // find user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // check current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.passwordHash
    );
    if (!isCurrentPasswordValid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // update password
    user.passwordHash = newPasswordHash;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ error: "Server error during password change" });
  }
});

// Verify token (protected)
router.get("/verify", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      valid: true,
      user: sanitizeUser(user),
    });
  } catch (err) {
    console.error("Verify token error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
