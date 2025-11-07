const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerSchema, loginSchema } = require('../utils/validation');
const { auth } = require('../middleware/auth');
const { eventBus, EVENTS, scheduleReminders } = require('../utils/eventSystem');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User(req.body);
    await user.save();

    // Emit user registration event
    eventBus.emit(EVENTS.USER_REGISTERED, {
      userId: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender
    });

    // Schedule reminders for new user
    scheduleReminders(user._id, {
      waterReminders: true,
      workoutReminders: true
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'User created successfully',
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        gender: user.gender
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        gender: user.gender,
        preferences: user.preferences
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      gender: req.user.gender,
      age: req.user.age,
      height: req.user.height,
      weight: req.user.weight,
      fitnessGoals: req.user.fitnessGoals,
      injuries: req.user.injuries,
      preferences: req.user.preferences
    }
  });
});

module.exports = router;