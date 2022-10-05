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
const CommentsController = require('../controllers/comments')

router.use(cors(corsOptions))
router.use(express.json())

router.get('/displaycomments',authSession,multer,CommentsController.displayComments)
router.post('/createcomments/:id',authSession,multer,CommentsController.createComments)
router.delete('/deletecomments/:id',authSession,multer,CommentsController.deleteComments)


module.exports = router