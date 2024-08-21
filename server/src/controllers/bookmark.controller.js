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
        return res.status(500).json({ success: false, message: "Error while toggling bookmark on post" });
    }
});

const getAllBookmarks = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId;  

      

        // Fetch the user from the database
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Extract the title query parameter from the request
        const { title } = req.query;

        // Validate and convert the user's bookmarked post IDs to ObjectId
        const bookmarkedPostIds = user.bookmarks
            


        // If no valid bookmarked IDs are found, return an empty list
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

        // Create a filter object to find posts with IDs matching the user's bookmarks
        let filter = { _id: { $in: bookmarkedPostIds } };

        // Optionally filter posts by title if the title query is provided
        if (title) {
            filter.heading = { $regex: title, $options: "i" };
        }

        // Fetch the bookmarked posts from the database with the filter applied
        const bookmarks = await Post.find(filter).sort({ createdAt: -1 });


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
