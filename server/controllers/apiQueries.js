const models = require('../db/models')

module.exports = {
  /**  ====== PATIENT related Queries ========
   *
   */
  findPatientById: (id) => {
    return models.Patient.findOne({
      where: { id }
    })
  },
  findAllPatients: () => {
    return models.Patient.findAll()
  },
  addPatient: (ptObj) => {
    return models.Patient.findOrCreate({ where: { email: ptObj.email }, defaults: ptObj })
  }
}
