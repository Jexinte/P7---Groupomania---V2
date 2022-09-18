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

router.get('/listeposts',authSession,multer,PostsController.afficheLesPost)
router.get('/post/:id',authSession,multer,PostsController.afficheLePost)
router.post('/creation',authSession,multer,PostsController.creationDunPost)

module.exports = router