const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create provider Schema
const providerSchema = new Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  address: {type: String},
  specialty: {type: String}
})

const Provider = mongoose.model('Provider', providerSchema)

module.exports = Provider
