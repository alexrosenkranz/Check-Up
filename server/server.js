// App dependencies ---------------------------- /
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const parseTokenCookie = require('./auth/parseTokenCookie')
const morgan = require('morgan')
require('dotenv').load()
const path = require('path')

// Create express App ------------------------- /
const app = express()
app.disable('x-powered-by')
const PORT = process.env.PORT || 3001

// Server staic files ------------------------------ /
// app.use(express.static(path.join(__dirname, '/..', '/browserClient/dist')))
app.use(express.static(path.join(__dirname, '/build')))

// App middleware ------------------------------ /
app.use(morgan('dev')) // for logging
app.use(cookieParser())
app.use(parseTokenCookie())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Route config -------------------------------------------/
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, '/index.html'))
  res.sendFile(path.join(__dirname, '/bundle/index.html'))
})
app.use('/auth', require('./controllers/authRouter'))
app.use('/api/v2', require('./controllers/apiRouter'))

// Start server ---------------------------------- /
if (process.env.NODE_ENV !== 'testing') {
  require('./models').connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to the database ...')
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.log('Mongo DB connection error')
    console.log(err)
  })
}

module.exports = app
