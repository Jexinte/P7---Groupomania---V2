const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const multer = require('../middleware/multerConfig')
const authSession = require('../middleware/auth-session')
const PostsController = require('../controllers/posts')
router.use(cors())

router.post('/create',authSession,multer,PostsController.creationDunPost)

module.exports = router