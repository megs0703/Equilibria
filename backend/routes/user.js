const express = require('express');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update preferences
router.put('/preferences', auth, async (req, res) => {
  try {
    const { workoutType, proteinIntake, calorieGoal, waterGoal } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { 
        $set: { 
          'preferences.workoutType': workoutType,
          'preferences.proteinIntake': proteinIntake,
          'preferences.calorieGoal': calorieGoal,
          'preferences.waterGoal': waterGoal,
          role: workoutType === 'gym' ? 'gym_user' : 'home_user'
        }
      },
      { new: true }
    ).select('-password');

    res.json({ message: 'Preferences updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Calculate protein intake
router.get('/protein-recommendation', auth, async (req, res) => {
  try {
    const user = req.user;
    const { goal } = req.query;
    
    let multiplier = 1.6; // default for muscle gain
    if (goal === 'weight_loss') multiplier = 1.2;
    if (goal === 'endurance') multiplier = 1.4;
    
    const recommendedProtein = Math.round(user.weight * multiplier);
    
    res.json({
      recommendedProtein,
      currentWeight: user.weight,
      goal: goal || 'muscle_gain'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;