const express = require('express')
const router = express.Router()
const postController = require('../controllers/post.controller.js')
const likeController = require('../controllers/like.controller.js')
const {verifyToken} = require('../middlewares/verifyJwtToken.js')
const {upload} = require('../middlewares/multer.middleware.js')

router.post(
    '/create',
    verifyToken,
    upload.fields([{ name: 'imageAvatar', maxCount: 1 }]), // Handle imageAvatar upload
    postController.createPost
  );
router.get( "/my-posts", verifyToken , postController.getMyPosts)
router.put(
    '/update/:postId',
    verifyToken,
    upload.fields([{ name: 'imageAvatar', maxCount: 1 }]), // Handle imageAvatar upload
    postController.updatePost
  );
router.get( "/all-posts" , postController.getAllPosts)
router.get( "/view-post/:postId" , postController.viewPost)
router.delete( "/delete/:postId", verifyToken , postController.deletePost)

router.post("/like/:postId", verifyToken, likeController.likePost)



module.exports = router