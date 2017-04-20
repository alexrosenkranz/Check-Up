const db = require('../db/models')

module.exports = {
  /**  ====== PATIENT related Queries ========
   *
   */
  findPatientById: (id) => {
    return db.Patient.findOne({
      where: { id },
      include: [
        { model: db.Provider }
      ]
    })
  },
  findAllPatients: () => {
    return db.Patient.findAll({
      include: [
        { model: db.Provider }
      ]
    })
  },
  addPatient: (ptObj) => {
    return db.Patient.findOrCreate({ where: { email: ptObj.email }, defaults: ptObj })
  },
  /**
   *  =========== Provider related Queries ============
   */
  addProvider: (providerObj) => {
    return db.Provider.create(providerObj)
  },
  findAllProviders: () => {
    return db.Provider.findAll()
  }
}
