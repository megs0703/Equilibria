const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: String, required: true },
  weight: { type: Number },
  duration: { type: Number }, // in minutes
  restTime: { type: Number }, // in seconds
  instructions: String,
  targetMuscles: [String],
  equipment: String
});

const workoutPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['gym', 'home'], required: true },
  goal: { type: String, enum: ['weight_loss', 'weight_gain', 'muscle_gain', 'endurance'], required: true },
  exercises: [exerciseSchema],
  duration: { type: Number }, // total workout duration in minutes
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);