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
const UsersControllers = require('../controllers/user')
const checkPassword = require('../middleware/passwordValidator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MySQLStore = require('express-mysql-session')(session)
const authSession = require('../middleware/auth-session')
const options = {
  host : `${process.env.HOST}`,
  port : `${process.env.PORT}`,
  user : `${process.env.USER}`,
  password : `${process.env.MDP}`,
  database:`${process.env.DATABASE}`,
  createDatabaseTable:false,
  clearExpired:true,
}

const sessionStore = new MySQLStore(options)

router.use(session({
  key:'id_session',
  secret:`${process.env.SECRETSESSIONCOOKIE}`,
  store:sessionStore,
   resave:false,
  saveUninitialized:false
}))

router.use(cookieParser())
router.use(cors(corsOptions))


router.get('/users',multer,authSession,UsersControllers.privateProfilData)
router.post('/registration',multer,checkPassword,UsersControllers.registration)
router.post('/login',multer,UsersControllers.login)
router.post('/logout',UsersControllers.logout)
module.exports = router