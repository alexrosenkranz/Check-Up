const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

// 1. Creating patient Schema
const patientSchema = new Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, require: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  appointments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Appointment'
    }
  ]
})

// 2. user schema methods
patientSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
  },
  hashPassword: (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10)
  }
}

// 3. hooks
patientSchema.pre('save', function (done) {
  this.password = this.hashPassword(this.password)
  done()
})

// 4. create ref to new collection
const Patient = mongoose.model('Patient', patientSchema)

// 5. export the Patient collection
module.exports = Patient
