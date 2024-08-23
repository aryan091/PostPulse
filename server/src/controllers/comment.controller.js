const Comment = require("../models/comment.model");
const Post = require("../models/post.model");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");
const apiError = require("../utils/apiError");

// Create a new comment
const createComment = asyncHandler(async (req, res) => {
  try {
    const { text, postId } = req.body;
    const commentedBy = req.userId; // Assuming you have user authentication and `req.userId` is set

    const comment = new Comment({ text, commentedBy, postId });
    await comment.save();

    // Add comment to the post
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

    return res.status(201).json(
      new apiResponse(
        201,
        { comment },
        "Comment Created Successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false, message: "Error while creating comment" });
  }
});

// Get all comments for a post
const getCommentsByPost = asyncHandler(async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId }).populate("commentedBy", "name email avatar");

    return res.status(200).json(
      new apiResponse(
        200,
        { comments },
        "Comments Fetched Successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false, message: "Error while fetching comments" });
  }
});

// Update a comment
const updateComment = asyncHandler(async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const comment = await Comment.findByIdAndUpdate(commentId, { text }, { new: true });

    if (!comment) {
      throw new apiError(404, "Comment not found");
    }

    return res.status(200).json(
      new apiResponse(
        200,
        { comment },
        "Comment Updated Successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false, message: "Error while updating comment" });
  }
});

// Delete a comment
const deleteComment = asyncHandler(async (req, res) => {
  try {
    const { commentId } = req.params;

    // Remove comment from the post
    await Post.findOneAndUpdate({ comments: commentId }, { $pull: { comments: commentId } });

    // Delete the comment
    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json(
      new apiResponse(
        200,
        { commentId },
        "Comment Deleted Successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false, message: "Error while deleting comment" });
  }
});

module.exports = {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
};
