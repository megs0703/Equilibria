const express = require('express');
const WaterLog = require('../models/WaterLog');
const { auth } = require('../middleware/auth');
const { eventBus, EVENTS } = require('../utils/eventSystem');

const router = express.Router();

// Add water intake
router.post('/add', auth, async (req, res) => {
  try {
    const { glasses = 1 } = req.body;
    const today = new Date().toDateString();
    
    let waterLog = await WaterLog.findOne({
      userId: req.user._id,
      date: { $gte: new Date(today) }
    });

    if (!waterLog) {
      waterLog = new WaterLog({
        userId: req.user._id,
        date: new Date(),
        goal: req.user.preferences.waterGoal || 8
      });
    }

    waterLog.glasses += glasses;
    waterLog.timestamps.push({
      time: new Date(),
      amount: glasses
    });

    await waterLog.save();

    // Emit water added event
    eventBus.emit(EVENTS.WATER_ADDED, {
      userId: req.user._id,
      glasses: glasses,
      totalGlasses: waterLog.glasses,
      goal: waterLog.goal
    });

    res.json({ message: 'Water intake recorded', waterLog });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get today's water log
router.get('/today', auth, async (req, res) => {
  try {
    const today = new Date().toDateString();
    const waterLog = await WaterLog.findOne({
      userId: req.user._id,
      date: { $gte: new Date(today) }
    });

    if (!waterLog) {
      return res.json({
        glasses: 0,
        goal: req.user.preferences.waterGoal || 8,
        progress: 0
      });
    }

    const progress = Math.min((waterLog.glasses / waterLog.goal) * 100, 100);
    res.json({
      glasses: waterLog.glasses,
      goal: waterLog.goal,
      progress,
      timestamps: waterLog.timestamps
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get water intake history
router.get('/history', auth, async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const waterLogs = await WaterLog.find({
      userId: req.user._id,
      date: { $gte: startDate }
    }).sort({ date: -1 });

    res.json(waterLogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;