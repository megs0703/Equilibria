const express = require('express');
const Post = require('../models/Post');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Create post
router.post('/posts', auth, async (req, res) => {
  try {
    const post = new Post({
      ...req.body,
      userId: req.user._id
    });
    
    await post.save();
    await post.populate('userId', 'name gender');
    
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get feed posts
router.get('/feed', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const posts = await Post.find({ isPublic: true })
      .populate('userId', 'name gender')
      .populate('comments.userId', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Like/unlike post
router.post('/posts/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const isLiked = post.likes.includes(req.user._id);
    
    if (isLiked) {
      post.likes = post.likes.filter(id => !id.equals(req.user._id));
    } else {
      post.likes.push(req.user._id);
    }
    
    await post.save();
    res.json({ message: isLiked ? 'Post unliked' : 'Post liked', likes: post.likes.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add comment
router.post('/posts/:id/comment', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    post.comments.push({
      userId: req.user._id,
      content
    });
    
    await post.save();
    await post.populate('comments.userId', 'name');
    
    res.json({ message: 'Comment added', comments: post.comments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's posts
router.get('/posts/my', auth, async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user._id })
      .populate('userId', 'name gender')
      .sort({ createdAt: -1 });
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;