const express = require('express');
const ProgressLog = require('../models/ProgressLog');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Add progress entry
router.post('/', auth, async (req, res) => {
  try {
    const progressLog = new ProgressLog({
      ...req.body,
      userId: req.user._id
    });
    
    await progressLog.save();
    res.status(201).json({ message: 'Progress logged successfully', progressLog });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get progress history
router.get('/', auth, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const progressLogs = await ProgressLog.find({
      userId: req.user._id,
      date: { $gte: startDate }
    }).sort({ date: -1 });

    res.json(progressLogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get analytics
router.get('/analytics', auth, async (req, res) => {
  try {
    const progressLogs = await ProgressLog.find({ userId: req.user._id })
      .sort({ date: 1 });

    if (progressLogs.length === 0) {
      return res.json({ message: 'No progress data available' });
    }

    const analytics = {
      weightTrend: calculateTrend(progressLogs, 'weight'),
      bodyFatTrend: calculateTrend(progressLogs, 'bodyFat'),
      averageMood: calculateAverageMood(progressLogs),
      averageEnergy: calculateAverageEnergy(progressLogs),
      totalEntries: progressLogs.length,
      latestEntry: progressLogs[progressLogs.length - 1]
    };

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

const calculateTrend = (logs, field) => {
  const validLogs = logs.filter(log => log[field] != null);
  if (validLogs.length < 2) return null;

  const first = validLogs[0][field];
  const last = validLogs[validLogs.length - 1][field];
  const change = last - first;
  const percentage = ((change / first) * 100).toFixed(1);

  return {
    change: change.toFixed(1),
    percentage,
    trend: change > 0 ? 'increasing' : change < 0 ? 'decreasing' : 'stable'
  };
};

const calculateAverageMood = (logs) => {
  const moodValues = { excellent: 5, good: 4, average: 3, poor: 2, terrible: 1 };
  const validMoods = logs.filter(log => log.mood).map(log => moodValues[log.mood]);
  
  if (validMoods.length === 0) return null;
  
  const average = validMoods.reduce((sum, mood) => sum + mood, 0) / validMoods.length;
  return average.toFixed(1);
};

const calculateAverageEnergy = (logs) => {
  const validEnergy = logs.filter(log => log.energyLevel).map(log => log.energyLevel);
  
  if (validEnergy.length === 0) return null;
  
  const average = validEnergy.reduce((sum, energy) => sum + energy, 0) / validEnergy.length;
  return average.toFixed(1);
};

module.exports = router;