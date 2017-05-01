const mongoose = require('mongoose')
const Schema = mongoose.Schema

const medicationSchema = new Schema({
  drug_name: {type: String},
  dosage: {type: String},
  frequency: {type: String},
  directions: {type: String},
  starting_date: {type: Date},
  ending_date: {type: Date}
})

const Medication = mongoose.model('Medication', medicationSchema)

module.exports = Medication
