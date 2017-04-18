// App dependencies ---------------------------- /
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
// const errorHandler = require('./controllers/middleware/errorHandler')

// Create express App ------------------------- /
const app = express()
const PORT = process.env.PORT || 3001

// require models ------------------------- /
const db = require('./db/models')
const apiRouter = require('./controllers/apiRouter')

// Logger ------------------------- /
app.use(morgan(':method :url :status :res[content-length] - :response-time ms')) // for logging

// App middleware ------------------------------ /
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Route config -------------------------------------------/
app.use('/api', apiRouter)
// app.use(errorHandler)

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/..', '/client/build')))
  // app.get('/', (req, res) => {
  //   res.type('.html')
  //   res.sendFile(path.join(__dirname, '../client/build/index.html'))
  // })
}

// Start server ---------------------------------- /
if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'travisTest') {
  db.sequelize.sync().then(() => {
    console.info('Databases are all synced!')
    app.listen(PORT, (err) => {
      if (err) console.log(err)
      console.info(`${process.env.NODE_ENV} ENV: Listening on port: ${PORT}`)
    })
  }).catch((err) => console.error(err))
} else {
  app.listen(PORT, (err) => {
    if (err) console.log(err)
    console.info(`Listening on port: ${PORT}`)
  })
}
module.exports = app
