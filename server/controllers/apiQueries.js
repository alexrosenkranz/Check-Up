const models = require('../db/models')

module.exports = {
  findPatientById: (id) => {
    return models.Patient.findOne({
      where: { id }
    })
  },
  findAllPatients: () => {
    return models.Patient.findAll()
  }
}
