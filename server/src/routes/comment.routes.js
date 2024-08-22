const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller.js');
const { verifyToken } = require('../middlewares/verifyJwtToken');

// Create a comment
router.post('/create', verifyToken, commentController.createComment);

// Get all comments for a post
router.get('/post/:postId', commentController.getCommentsByPost);

// Update a comment
router.put('/update/:commentId', verifyToken, commentController.updateComment);

// Delete a comment
router.delete('/delete/:commentId', verifyToken, commentController.deleteComment);

module.exports = router;
