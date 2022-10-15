const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
	windowMs: 100, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
  

const sequelize = require('./db/sequelize')
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
app.use(limiter)

sequelize.initDbUser()
sequelizeSession.initDbSession()
sequelizePosts.initDbPost()

app.listen(3000,() => console.log(`Le serveur a bien démarrer sur le port 3000`))