const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')


const sequelizeUsers = require('./db/users')
const sequelizeSession = require('./db/session')
const sequelizePosts = require('./db/posts')
const UsersRoutes = require('./routes/user')
const PostsRoutes = require('./routes/posts')
const CommentsRoutes = require('./routes/comments')
const app = express()


app.use(morgan('dev'))
app.use('/api/auth',UsersRoutes)
app.use('/api/posts',PostsRoutes)
app.use('/api/posts',CommentsRoutes)
app.use('/images',express.static('images'))
app.use(helmet())


sequelizeUsers.initDbUser()
sequelizeSession.initDbSession()
sequelizePosts.initDbPost()

app.listen(3000 , () => console.log(`Le serveur a bien démarrer sur le port 3000`))