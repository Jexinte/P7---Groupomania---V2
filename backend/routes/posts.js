const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const corsOptions = {
  credentials:true,
  origin:true
}
const multer = require('../middleware/multerConfig')
const authSession = require('../middleware/auth-session')
const PostsController = require('../controllers/posts')

router.use(cors(corsOptions))
router.use(express.json())

//* POSTS ROUTES
router.get('/listsposts',authSession,multer,PostsController.displayPosts)
router.get('/displaypost/:id',authSession,multer,PostsController.displayPost)
router.post('/createpost',authSession,multer,PostsController.createPost)
router.put('/displaypost/like/:id',authSession,multer,PostsController.likeSystem)
router.put('/updatepost/:id',authSession,multer,PostsController.updatePost)
router.delete('/deletepost/:id',authSession,multer,PostsController.deletePost)

//* COMMENTS ROUTES
router.get('/displaycomments',authSession,multer,PostsController.displayComments)
router.post('/createcomments/:id',authSession,multer,PostsController.createComments)


module.exports = router