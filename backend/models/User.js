const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  height: { type: Number, required: true }, // in cm
  weight: { type: Number, required: true }, // in kg
  fitnessGoals: [{ type: String }],
  injuries: [{ type: String }],
  role: { type: String, enum: ['gym_user', 'home_user', 'admin'], default: 'home_user' },
  preferences: {
    workoutType: { type: String, default: 'home' },
    proteinIntake: { type: Number },
    calorieGoal: { type: Number },
    waterGoal: { type: Number, default: 8 }
  },
  isVerified: { type: Boolean, default: false },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);