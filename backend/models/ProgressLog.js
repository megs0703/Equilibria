const mongoose = require('mongoose');

const progressLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  weight: { type: Number },
  bodyFat: { type: Number },
  muscleMass: { type: Number },
  measurements: {
    chest: { type: Number },
    waist: { type: Number },
    hips: { type: Number },
    arms: { type: Number },
    thighs: { type: Number }
  },
  photos: [{
    url: String,
    type: { type: String, enum: ['front', 'side', 'back'] }
  }],
  notes: String,
  mood: { type: String, enum: ['excellent', 'good', 'average', 'poor', 'terrible'] },
  energyLevel: { type: Number, min: 1, max: 10 }
}, {
  timestamps: true
});

module.exports = mongoose.model('ProgressLog', progressLogSchema);