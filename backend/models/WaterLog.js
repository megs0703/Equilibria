const mongoose = require('mongoose');

const waterLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  glasses: { type: Number, default: 0 },
  goal: { type: Number, default: 8 },
  timestamps: [{
    time: { type: Date, default: Date.now },
    amount: { type: Number, default: 1 } // glasses
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('WaterLog', waterLogSchema);