const express = require('express')
const router = express.Router()
const authController = require('../controllers/user.controller.js')
const { verifyToken } = require('../middlewares/verifyJwtToken.js')
const bookmarkController = require('../controllers/bookmark.controller.js')

router.post( "/register", authController.registerUser )
router.post( "/login", authController.loginUser )
router.get('/profile' , verifyToken, authController.getUserProfile)
router.get('/:userId' , verifyToken, authController.getUserById)
router.post('/bookmark/:postId' , verifyToken, bookmarkController.toggleBookmarkPost)
router.post('/bookmarks', verifyToken, bookmarkController.getAllBookmarks);




module.exports = router