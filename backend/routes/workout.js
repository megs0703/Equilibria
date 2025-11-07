const express = require('express');
const WorkoutPlan = require('../models/WorkoutPlan');
const { auth } = require('../middleware/auth');
const { workoutPlanSchema } = require('../utils/validation');
const { getPersonalizedWorkoutRecommendations } = require('../utils/aiRecommendations');

const router = express.Router();

// Create workout plan
router.post('/', auth, async (req, res) => {
  try {
    const { error } = workoutPlanSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const workoutPlan = new WorkoutPlan({
      ...req.body,
      userId: req.user._id
    });

    await workoutPlan.save();
    res.status(201).json({ message: 'Workout plan created successfully', workoutPlan });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's workout plans
router.get('/', auth, async (req, res) => {
  try {
    const workoutPlans = await WorkoutPlan.find({ userId: req.user._id });
    res.json(workoutPlans);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get workout suggestions based on user profile
router.get('/suggestions', auth, async (req, res) => {
  try {
    const user = req.user;
    const { goal } = req.query;
    
    // Get AI-powered personalized recommendations
    const suggestions = getPersonalizedWorkoutRecommendations(user, goal);
    
    res.json({ suggestions, userType: user.preferences.workoutType });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



module.exports = router;