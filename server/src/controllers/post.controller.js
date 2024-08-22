const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");
const apiError = require("../utils/apiError");
const Post = require("../models/post.model");
const { decodeJwtToken } = require("../middlewares/verifyJwtToken");

const createPost = asyncHandler(async (req, res) => {
    try {
        const { heading, description, imageUrl } = req.body;

        // Validate the input fields
        if (!heading || !description || !imageUrl) {
            throw new apiError(401, "All fields (heading, description, image URL) must be provided");
        }

        const userId = req.userId;

        const post = new Post({
            heading,
            description,
            imageUrl,
            addedBy: userId,
            
        });

        const savedPost = await post.save();

        return res.status(200).json(
            new apiResponse(
                200,
                { post: savedPost },
                "Post Created Successfully",
                true
            )
        );
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: "Error while Creating Post" });
    }
});

const getMyPosts = asyncHandler(async (req, res) => {
    try {
        const { title } = req.query;

        // Decode the JWT token to get the user ID
        const userId = decodeJwtToken(req.headers["authorization"]);

        if (!userId) {
            throw new apiError(401, "User not found");
        }

        // Create a filter object to find posts added by the user and optionally filter by title
        let filter = { addedBy: userId };
        if (title) {
            // Use a regular expression to match the title (case-insensitive)
            filter.heading = { $regex: title, $options: "i" };
        }

        // Query the database for the user's posts with the filter applied
        const userPosts = await Post.find(filter).sort({ createdAt: -1 });

        if (!userPosts || userPosts.length === 0) {
            throw new apiError(404, "No user posts found");
        }

        // Send the response with the filtered and sorted posts
        return res.status(200).json(
            new apiResponse(
                200,
                { posts: userPosts },
                "User Posts Fetched Successfully",
                true
            )
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error while getting User Posts" });
    }
});

const getAllPosts = asyncHandler(async (req, res) => {
    try {
        const { title } = req.query;

        let filter = {};
        if (title) {
            // Use a regular expression to match the title (case-insensitive)
            filter = { heading: { $regex: title, $options: 'i' } };
        }

        // Fetch posts from the database with the filter applied
        const allPosts = await Post.find(filter).sort({ createdAt: -1 });

        return res.status(200).json(
            new apiResponse(
                200,
                { posts: allPosts },
                "Posts Fetched Successfully",
                true
            )
        );
    } catch (error) {
        return res.status(401).json({ success: false, message: "Error while fetching Posts" });
    }
});


const viewPost = asyncHandler(async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId)
        .populate("addedBy", "name email"); // Populate the `addedBy` field
        if (!post) {
            throw new apiError(404, "Post not found");
        }

        return res.status(200).json(
            new apiResponse(
                200,
                { post },
                "Post Fetched Successfully",
                true
            )
        );
    } catch (error) {
        return res.status(401).json({ success: false, message: "Cannot view Post" });
    }
});

const updatePost = asyncHandler(async (req, res) => {
    try {
        const postId = req.params.postId;
        const { heading, description, imageUrl } = req.body;

        if (!heading || !description || !imageUrl) {
            throw new apiError(401, "Please provide all the required fields");
        }

        const post = await Post.findById(postId);

        if (!post) {
            throw new apiError(401, "Post not found");
        }

        post.heading = heading;
        post.description = description;
        post.imageUrl = imageUrl;

        await post.save();

        return res.status(200).json(
            new apiResponse(
                200,
                { post },
                "Post Updated Successfully",
                true
            )
        );
    } catch (error) {
        return res.status(401).json({ success: false, message: "Error while updating Post" });
    }
});

const deletePost = asyncHandler(async (req, res) => {
    try {
        const postId = req.params.postId;

        // Find the post by ID
        const post = await Post.findById(postId);

        if (!post) {
            throw new apiError(404, "Post not found");
        }

        // Delete the post
        await Post.findByIdAndDelete(postId);

        return res.status(200).json(
            new apiResponse(
                200,
                {post},
                "Post Deleted Successfully",
                true
            )
        );
    } catch (error) {
        return res.status(401).json({ success: false, message: "Error while deleting Post" });
    }
});


module.exports = {
    createPost,
    getMyPosts,
    getAllPosts,
    viewPost,
    updatePost,
    deletePost
};
