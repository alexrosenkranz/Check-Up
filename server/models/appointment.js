const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 1. Create the appointment schema
const appointmentSchema = new Schema({
  appTime: {type: Date, default: Date.now},
  provider: {type: String},
  notes: {type: String}
  // provider: {
  //   type: Schema.Types.ObjectId,
  // }
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment
