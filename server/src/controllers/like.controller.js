const User = require("../models/user.model");
const Post = require("../models/post.model"); // Change Story to Post
const apiResponse = require("../utils/apiResponse");
const apiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");
const { decodeJwtToken } = require("../middlewares/verifyJwtToken");

const likePost = asyncHandler(async (req, res) => {
    try {
      const postId = req.params.postId;
      const userId = req.userId;
  
      const post = await Post.findById(postId);
  
      if (!post) {
        throw new apiError(404, "Post not found");
      }
  
      const user = await User.findById(userId);
  
      if (!user) {
        throw new apiError(404, "User not found");
      }
  
      // Check if user has already liked the post
      const isLiked = user.likes.includes(postId);
  
      if (isLiked) {
        // Remove like from user and post
        const userLikeIndex = user.likes.indexOf(postId);
        user.likes.splice(userLikeIndex, 1);
  
        const postLikeIndex = post.likes.indexOf(userId);
        post.likes.splice(postLikeIndex, 1);
  
        // Update totalLikes count
        post.totalLikes = post.likes.length;
  
        await user.save();
        await post.save();
  
        return res.status(200).json(
          new apiResponse(
            200,
            {
              post: post,
              user: user,
              totalLikes: post.totalLikes,
              liked: false,
              likes: post.likes,
            },
            "Post unliked successfully",
            true
          )
        );
      } else {
        // Add like to user and post
        user.likes.push(postId);
        post.likes.push(userId);
  
        // Update totalLikes count
        post.totalLikes = post.likes.length;
  
        await user.save();
        await post.save();
  
        return res.status(200).json(
          new apiResponse(
            200,
            {
              post: post,
              user: user,
              totalLikes: post.totalLikes,
              liked: true,
              likes: post.likes,
            },
            "Post liked successfully",
            true
          )
        );
      }
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Error while liking Post" });
    }
  });
  
  module.exports = {
    likePost,
  };