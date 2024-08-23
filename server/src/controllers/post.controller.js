const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");
const apiError = require("../utils/apiError");
const Post = require("../models/post.model");
const { decodeJwtToken } = require("../middlewares/verifyJwtToken");
const { uploadOnCloudinary , deleteFromCloudinary} = require("../utils/cloudnary");

const createPost = asyncHandler(async (req, res) => {
    try {
        const { heading, description} = req.body;

        // Validate the input fields
        if (!heading || !description ) {
            throw new apiError(401, "All fields (heading, description, image URL) must be provided");
        }

        const userId = req.userId;

        const imageAvatarLocalPath = req.files?.imageAvatar[0]?.path;

    if (!imageAvatarLocalPath) {
      throw new apiError(400, "Avatar is required");
    }

    // upload them to cloudinary, avatar

    const imageAvatar = await uploadOnCloudinary(imageAvatarLocalPath);

    if (!imageAvatar) {
      throw new apiError(500, "Failed to upload avatar");
    }


        const post = new Post({
            heading,
            description,
            imageAvatar: imageAvatar.url,
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
        const { heading, description } = req.body;

        if (!heading || !description) {
            throw new apiError(400, "Please provide all the required fields");
        }

        const post = await Post.findById(postId);

        if (!post) {
            throw new apiError(404, "Post not found");
        }

        // Check if imageAvatar is present in files and is an array with at least one element
        let imageAvatar = post.imageAvatar; // Keep the existing image if no new image is provided
        if (req.files && req.files.imageAvatar && req.files.imageAvatar.length > 0) {
            const imageAvatarLocalPath = req.files.imageAvatar[0].path;

            if (!imageAvatarLocalPath) {
                throw new apiError(400, "Image Avatar path is required");
            }

            if (imageAvatar) {
                await deleteFromCloudinary(imageAvatar);
            }

            // Upload the image to Cloudinary
            const uploadedImageAvatar = await uploadOnCloudinary(imageAvatarLocalPath);

            if (!uploadedImageAvatar) {
                throw new apiError(500, "Failed to upload image avatar");
            }

            imageAvatar = uploadedImageAvatar; // Update the image avatar if a new one is provided
            console.log("Image avatar uploaded successfully:", imageAvatar.url);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { heading, description, imageAvatar: imageAvatar.url },
            { new: true, runValidators: true }
          );

        return res.status(200).json(
            new apiResponse(
                200,
                { post: updatedPost },
                "Post Updated Successfully",
                true
            )
        );
    } catch (error) {
        console.error(error); // Use console.error for logging errors
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Error while updating Post"
        });
    }
});;

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
