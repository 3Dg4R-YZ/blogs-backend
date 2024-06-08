const express = require('express')
require('express-async-errors')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const app = express()

config.MONGODB_URI =
  'mongodb+srv://fullstack:fullstack@cluster0.mswpk.mongodb.net/blogs?retryWrites=true&w=majority'

logger.info('connecting to', config.MONGODB_URI)

mongoose.set('strictQuery', false)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use(middleware.requestLogger)
app.use(morgan('tiny'))

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.get('/', (req, res) => {
  res.send('<h1>Hola Mundo</h1>')
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
