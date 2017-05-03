const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create provider Schema
const providerSchema = new Schema({
  name: {type: String, required: true},
  phone: {type: String, required: true},
  address: {type: String},
  specialty: {type: String}
})

const Provider = mongoose.model('Provider', providerSchema)

module.exports = Provider
