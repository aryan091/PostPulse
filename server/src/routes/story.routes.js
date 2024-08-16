const express = require('express')
const router = express.Router()
const postController = require('../controllers/post.controller.js')
const {verifyToken} = require('../middlewares/verifyJwtToken')

router.post( "/create", verifyToken , postController.createStory)
router.get( "/my-stories", verifyToken , postController.getMyStories)
router.put( "/update/:storyId", verifyToken , postController.updateStory)
router.get( "/all-stories" , postController.getAllStories)
router.get( "/category/:category" , postController.getStoriesByCategory)
router.get( "/view-story/:storyId" , postController.viewStory)



module.exports = router