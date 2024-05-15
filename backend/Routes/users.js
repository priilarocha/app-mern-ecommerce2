import express from "express";
import bcrypt from "bcrypt";
import User from "../Models/users.js";

const router = express.Router();

// Get user by ID
router.get("/:id", async (req, res) => {
  const user_id = req.params.id;
  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body.data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already in database" });
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password,
      isAdmin,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    // Save user to database
    await newUser.save();
    const token = newUser.generateAuthToken();

    const data = {
      token: token,
      id: newUser.id,
      isAdmin: newUser.isAdmin,
    };
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body.data;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user with that email" });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = user.generateAuthToken();
    const data = {
      token: token,
      userId: user.id,
      isAdmin: user.isAdmin,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
