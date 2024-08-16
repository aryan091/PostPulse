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
            addedBy: userId
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
        return res.status(401).json({ success: false, message: "Error while Creating Post" });
    }
});

const getMyPosts = asyncHandler(async (req, res) => {
    try {
        const userId = decodeJwtToken(req.headers["authorization"]);

        if (!userId) {
            throw new apiError(401, "User not found");
        }

        const userPosts = await Post.find({ addedBy: userId });

        if (!userPosts) {
            throw new apiError(401, "No user posts found");
        }

        const updatedPosts = userPosts.map(post => ({
            ...post.toObject(),
            isEditable: true // Set isEditable to true for the current user's posts
        })).sort((a, b) => b.createdAt - a.createdAt);

        return res.status(200).json(
            new apiResponse(
                200,
                { posts: updatedPosts },
                "User Posts Fetched Successfully",
                true
            )
        );
    } catch (error) {
        return res.status(401).json({ success: false, message: "Error while getting User Posts" });
    }
});

const getAllPosts = asyncHandler(async (req, res) => {
    try {
        // Fetch all posts from the database
        const allPosts = await Post.find().sort({ createdAt: -1 });

        return res.status(200).json(
            new apiResponse(
                200,
                { posts: allPosts },
                "All Posts Fetched Successfully",
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
        const post = await Post.findById(postId);

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
                {},
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
