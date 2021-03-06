const mongoose = require('mongoose')

module.exports.connect = (uri) => {
  mongoose.Promise = global.Promise

  // console.log('================')
  console.log(uri)
  console.log('================')
  const options = {}
  mongoose.connect(uri, options, function (err) {
    if (err) {
      console.log(err)
        // reject()
    } else {
      console.log(`Successfully connected to db @ "${uri}"`)
    }
  })
}

module.exports.database = mongoose

// load models
module.exports.Patient = require('../server/models/patient')
module.exports.Appointment = require('../server/models/appointment')
module.exports.Provider = require('../server/models/provider')
module.exports.Medication = require('../server/models/medication')
