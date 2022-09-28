const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

const sequelize = require('./db/sequelize')
const sequelizeSession = require('./db/session')
const sequelizePosts = require('./db/posts')
const UsersRoutes = require('./routes/user')
const PostsRoutes = require('./routes/posts')
const app = express()
const port = 3000

app.use(morgan('dev'))
app.use('/api/auth',UsersRoutes)
app.use('/api/posts',PostsRoutes)
app.use('/images',express.static('images'))
app.use(helmet())

sequelize.initDbUser()
sequelizeSession.initDbSession()
sequelizePosts.initDbPost()

app.listen(port,() => console.log(`Le serveur a bien démarrer sur le port ${port}`))