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
router.get('/affichepost/:id',authSession,multer,PostsController.afficheLePost)
router.get('/affichescommentaires',authSession,multer,PostsController.afficheLesCommentaires)

router.post('/creation',authSession,multer,PostsController.creationDunPost)
router.post('/creationcommentaire/:id',authSession,multer,PostsController.creationCommentaire)
router.put('/affichepost/:id',authSession,multer,PostsController.likesSystem)

module.exports = router