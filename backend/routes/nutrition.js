const express = require('express');
const NutritionLog = require('../models/NutritionLog');
const { auth } = require('../middleware/auth');
const { mealSchema } = require('../utils/validation');
const { getNutritionRecommendations } = require('../utils/aiRecommendations');
const { eventBus, EVENTS } = require('../utils/eventSystem');

const router = express.Router();

// Add meal to nutrition log
router.post('/meal', auth, async (req, res) => {
  try {
    const { error } = mealSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { mealType, ...mealData } = req.body;
    const today = new Date().toDateString();
    
    let nutritionLog = await NutritionLog.findOne({
      userId: req.user._id,
      date: { $gte: new Date(today) }
    });

    if (!nutritionLog) {
      nutritionLog = new NutritionLog({
        userId: req.user._id,
        date: new Date(),
        meals: { breakfast: [], lunch: [], dinner: [], snacks: [] }
      });
    }

    nutritionLog.meals[mealType].push(mealData);
    await nutritionLog.save();

    // Emit meal logged event
    eventBus.emit(EVENTS.MEAL_LOGGED, {
      userId: req.user._id,
      mealName: mealData.name,
      mealType,
      calories: mealData.calories,
      totalCalories: nutritionLog.totalCalories
    });

    res.json({ message: 'Meal added successfully', nutritionLog });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get today's nutrition log
router.get('/today', auth, async (req, res) => {
  try {
    const today = new Date().toDateString();
    const nutritionLog = await NutritionLog.findOne({
      userId: req.user._id,
      date: { $gte: new Date(today) }
    });

    if (!nutritionLog) {
      return res.json({
        meals: { breakfast: [], lunch: [], dinner: [], snacks: [] },
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFats: 0
      });
    }

    res.json(nutritionLog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get nutrition history
router.get('/history', auth, async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const nutritionLogs = await NutritionLog.find({
      userId: req.user._id,
      date: { $gte: startDate }
    }).sort({ date: -1 });

    res.json(nutritionLogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get meal suggestions
router.get('/suggestions', auth, async (req, res) => {
  try {
    const user = req.user;
    const { mealType, goal } = req.query;
    
    const nutritionPlan = getNutritionRecommendations(user, goal);
    const suggestions = nutritionPlan.recommendations[mealType] || [];
    
    res.json({ 
      suggestions,
      dailyTargets: {
        calories: nutritionPlan.calories,
        protein: nutritionPlan.protein,
        carbs: nutritionPlan.carbs,
        fats: nutritionPlan.fats
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



module.exports = router;