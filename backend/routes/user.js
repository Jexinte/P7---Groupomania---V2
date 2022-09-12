const express = require('express')
const router = express.Router()
const cors = require('cors')
const multer = require('../middleware/multerConfig')

const UsersControllers = require('../controllers/user')
const contrôleDuMotDePasse = require('../middleware/passwordValidator')
router.use(cors())
router.post('/inscription',multer,contrôleDuMotDePasse,UsersControllers.inscription)
router.post('/connexion',multer,UsersControllers.connexion)
module.exports = router