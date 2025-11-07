const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, maxlength: 500 },
  type: { type: String, enum: ['workout', 'nutrition', 'progress', 'motivation'], required: true },
  images: [String],
  tags: [String],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, maxlength: 200 },
    createdAt: { type: Date, default: Date.now }
  }],
  isPublic: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);