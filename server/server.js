// App dependencies ---------------------------- /
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('dotenv').load()
const path = require('path')

// Create express App ------------------------- /
const app = express()
app.disable('x-powered-by')
const PORT = process.env.PORT || 3001

// require models ------------------------- /
const db = require('./db/models')

// Server staic files ------------------------------ /
app.use(express.static(path.join(__dirname, '/..', '/browserClient/dist')))

// App middleware ------------------------------ /
app.use(morgan('dev')) // for logging
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Route config -------------------------------------------/
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})
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
