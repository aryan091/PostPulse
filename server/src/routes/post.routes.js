const express = require('express')
const router = express.Router()
const postController = require('../controllers/post.controller.js')
const {verifyToken} = require('../middlewares/verifyJwtToken.js')

router.post( "/create", verifyToken , postController.createPost)
router.get( "/my-posts", verifyToken , postController.getMyPosts)
router.put( "/update/:postId", verifyToken , postController.updatePost)
router.get( "/all-posts" , postController.getAllPosts)
router.get( "/view-post/:postId" , postController.viewPost)
router.delete( "/delete/:postId", verifyToken , postController.deletePost)



module.exports = router