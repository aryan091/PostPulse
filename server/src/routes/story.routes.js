const express = require('express')
const router = express.Router()
const postController = require('../controllers/post.controller.js')
const {verifyToken} = require('../middlewares/verifyJwtToken')

router.post( "/create", verifyToken , postController.createPost)
router.get( "/my-stories", verifyToken , postController.getMyPosts)
router.put( "/update/:postId", verifyToken , postController.updatePost)
router.get( "/all-stories" , postController.getAllPosts)
router.get( "/view-story/:postId" , postController.viewPost)



module.exports = router