const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Render register page
router.get("/signup", (req, res) => {
  console.log("GET /signup hit");
  res.render("register");
});

// Handle user registration
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Signup Data Received:", { username, email, password });

    const user = new User({ username, email, password });
    await user.save();
    res.redirect("/auth/login");
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(400).send(`Registration failed! Error: ${error.message}`);
  }
});

// Render login page
router.get("/login", (req, res) => {
  console.log("GET /login hit");
  res.render("login");
});

// Handle user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found!");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("Invalid credentials!");

    const token = jwt.sign(
      { id: user._id, role: user.role }, // Include role in the token
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true });
    console.log("Cookie set with token:", token);
    res.redirect("/progress/add"); // Redirect to the progress-tracking page after login
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).send("Login failed!");
  }
});

module.exports = router;
