const User = require("../models/user.model");
const Post = require("../models/post.model"); // Change Story to Post
const apiResponse = require("../utils/apiResponse");
const apiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");
const { decodeJwtToken } = require("../middlewares/verifyJwtToken");
const mongoose = require("mongoose"); // Make sure to include mongoose

const toggleBookmarkPost = asyncHandler(async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.userId; // Assuming you have userId from the request

        const post = await Post.findById(postId);
        if (!post) {
            throw new apiError(404, "Post not found");
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new apiError(404, "User not found");
        }

        // Check if the post is already bookmarked
        const isBookmarked = user.bookmarks.includes(postId);

        if (isBookmarked) {
            // Unbookmark the post
            user.bookmarks = user.bookmarks.filter(id => id.toString() !== postId.toString());
            post.bookmarks = post.bookmarks.filter(id => id.toString() !== userId.toString());

            await user.save();
            await post.save();

            return res.status(200).json(
                new apiResponse(
                    200,
                    {
                        post,
                        user,
                        bookmarks: user.bookmarks,
                        bookmarked: false,
                    },
                    "Post unbookmarked successfully",
                    true
                )
            );
        } else {
            // Bookmark the post
            user.bookmarks.push(postId);
            post.bookmarks.push(userId);

            await user.save();
            await post.save();

            return res.status(200).json(
                new apiResponse(
                    200,
                    {
                        post,
                        user,
                        bookmarks: user.bookmarks,
                        bookmarked: true,
                    },
                    "Post bookmarked successfully",
                    true
                )
            );
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Error while toggling bookmark on post" });
    }
});

const getAllBookmarks = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId;  
        console.log("Decoded User ID:", userId);

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        const user = await User.findById(userId).exec();
        console.log("Fetched User:", user);

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        
        const bookmarkedPostIds = user.bookmarks
            .filter(id => mongoose.Types.ObjectId.isValid(id))  // Validate each ID
            .map(id => new mongoose.Types.ObjectId(id));  // Convert to ObjectId with 'new'

        console.log("Bookmarked Post IDs:", bookmarkedPostIds);

        if (bookmarkedPostIds.length === 0) {
            return res.status(200).json(
                new apiResponse(
                    200,
                    { bookmarks: [] },
                    "No bookmarks found",
                    true
                )
            );
        }

        // Find the posts with IDs matching the user's bookmarks
        const bookmarks = await Post.find({ _id: { $in: bookmarkedPostIds } })
            .sort({ createdAt: -1 });

        console.log("Fetched Bookmarked Posts:", bookmarks);

        return res.status(200).json(
            new apiResponse(
                200,
                { bookmarks },
                "Fetched bookmarks successfully",
                true
            )
        );
    } catch (error) {
        console.error("Error while fetching bookmarks:", error);
        return res.status(500).json({ success: false, message: "Error while fetching bookmarks" });
    }
});




module.exports = {
    toggleBookmarkPost,
    getAllBookmarks
};
