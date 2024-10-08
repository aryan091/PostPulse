const User = require("../models/user.model")
const asyncHandler = require("../utils/asyncHandler")
const apiResponse = require("../utils/apiResponse")
const apiError = require("../utils/apiError")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { decodeJwtToken  } = require("../middlewares/verifyJwtToken")
const { uploadOnCloudinary } = require("../utils/cloudnary");

const registerUser = asyncHandler(async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if ([name, email, password].some((field) => field?.trim() === "")) {
        return res
          .status(401)
          .json({ success: false, message: "All Fields are required" });
      }
  
      const existedUser = await User.findOne({ email });
  
      if (existedUser) {
        return res
          .status(401)
          .json({ success: false, message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Check if an avatar file is uploaded
      if (!req.file) {
        return res.status(400).json({ success: false, message: "Avatar is required" });
      }
  
      console.log(req.file);
  
      // Upload avatar to Cloudinary
      const avatar = await uploadOnCloudinary(req.file.path);
  
      if (!avatar) {
        throw new apiError(500, "Failed to upload avatar");
      }
  
      const user = new User({
        name,
        email,
        password: hashedPassword,
        avatar: avatar.url,
      });
      await user.save();
  
      const createdUser = await User.findById(user._id).select("-password");
  
      if (!createdUser) {
        return res
          .status(401)
          .json({ success: false, message: "Failed to create user" });
      }
  
      return res
        .status(201)
        .json(
          new apiResponse(200, createdUser, "User registered successfully", true)
        );
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ success: false, message: "User registration failed" });
    }
  });

const loginUser = asyncHandler( async (req , res) => {
    try {
        const { email, password } = req.body;
    
        if (
            [ email, password].some((field) => field?.trim() === "")
        ) {
            return res.status(401).json({ success: false, message: "All Fields are required" })        }
    
        const user = await User.findOne({ email });
    
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found! " })
        } 

          //  compare password
          const comparePassword = await bcrypt.compare(password, user.password);
          if (!comparePassword)
          return res.status(401).json({ success: false, message: "Invalid Credentials" })
          
    
          // generate token
          const token = jwt.sign({userId: user?._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: "10d",
          });




          const loggedInUser = await User.findById(user._id).select("-password")


          
        
    
        return res
        .status(200)
        .json(
            new apiResponse(
                200,
                {
                    userData : loggedInUser,
                    token:token
                },
                
                "User logged in successfully",

                true
            )
        )
    }
       catch (error) {
        return res.status(401).json({ success: false, message: "Error while logging in " })
    }
    
})


const getUserProfile = asyncHandler( async (req, res) => {
    try {
        const userId = decodeJwtToken(req.headers["authorization"]);

        if (!userId) {
            return res.status(401).json({ success: false, message: "User Not logged in" })
        }

        const user = await User.findById(userId).select(
            "-password "
        );
        
        if (!user) {
            return res.status(401).json({ success: false, message: "User Not found " })
        }
        
        return res
        .status(200)
        .json(
            new apiResponse
            (
                200, 
                user, 

                "User profile fetched successfully", 

                true
            )
        )

        
    } catch (error) {
        return res.status(401).json({ success: false, message: "Error while fetching User profile " })

    }
})

const getUserById = asyncHandler( async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).select(
            "-password "
        );
        
        if (!user) {
            return res.status(401).json({ success: false, message: "User Not found " })
        }
        
        return res
        .status(200)
        .json(
            new apiResponse
            (
                200, 
                user,

                "User fetched successfully", 

                true
            )
        )
    } catch (error) {
        return res.status(401).json({ success: false, message: "Error while fetching User profile " })  

    }
})

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    getUserById
}