// App dependencies ---------------------------- /
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('dotenv').load()
// const path = require('path')

// Create express App ------------------------- /
const app = express()
app.disable('x-powered-by')
const PORT = process.env.PORT || 3001

// require models ------------------------- /
const db = require('./db/models')

// Express only serves static assets in production ... React PART
// if (process.env.NODE_ENV === 'production') {
  // app.use(express.static(path.join(__dirname, '/..', '/client/build')))
// }

// App middleware ------------------------------ /
app.use(morgan('dev')) // for logging
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Route config -------------------------------------------/
app.use('/api/v1', require('./controllers/apiRouter'))

// Start server ---------------------------------- /
if (process.env.NODE_ENV !== 'testing' || process.env.NODE_ENV !== 'travis') {
  db.sequelize.sync().then(() => {
    console.info('Databases are all synced!')
    app.listen(PORT, (err) => {
      if (err) console.log(err)
      console.info(`${process.env.NODE_ENV} ENV: Listening on port: ${PORT}`)
    })
  }).catch((err) => console.error(err))
}
module.exports = app
