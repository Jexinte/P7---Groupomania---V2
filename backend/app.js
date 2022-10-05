const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

const sequelize = require('./db/sequelize')
const sequelizeSession = require('./db/session')
const sequelizePosts = require('./db/posts')
const UsersRoutes = require('./routes/user')
const PostsRoutes = require('./routes/posts')
const CommentsRoutes = require('./routes/comments')
const app = express()
const port = 3000

app.use(morgan('dev'))
app.use('/api/auth',UsersRoutes)
app.use('/api/posts',PostsRoutes)
app.use('/api/posts',CommentsRoutes)
app.use('/images',express.static('images'))
app.use(helmet())

sequelize.initDbUser()
sequelizeSession.initDbSession()
sequelizePosts.initDbPost()

app.listen(3000,() => console.log(`Le serveur a bien démarrer sur le port 3000`))