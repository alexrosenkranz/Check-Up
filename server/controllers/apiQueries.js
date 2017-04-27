// const db = require('../db/models')

// module.exports = {
//   /**  ====== PATIENT related Queries ========
//    *
//    */
//   findPatientById: (id) => {
//     return db.Patient.findOne({
//       where: { id },
//       include: [
//         { model: db.Provider }
//       ]
//     })
//   },
//   findAllPatients: () => {
//     return db.Patient.findAll({
//       include: [
//         { model: db.Provider }
//       ]
//     })
//   },
//   addPatient: (ptObj) => {
//     return db.Patient.findOrCreate({ where: { email: ptObj.email }, defaults: ptObj })
//   },
//   /**
//    *  =========== Provider related Queries ============
//    */
//   /**
//    * @params providerObj {obj} - first_name, last_name, specialty, phone
//    */
//   addProvider: (providerObj) => {
//     return db.Provider.create(providerObj)
//   },
//   findAllProviders: () => {
//     return db.Provider.findAll()
//   },
//   /** ======  PatientProvider Queries ==========
//    * Should be able to:
//    * 1) add new patient provider relationship
//    * 2) remove a patient provider relationship
//    */
//   addPatientProvider: (Patient_id, Provider_id) => {
//     let data = { Patient_id, Provider_id }
//     return db.PatientProvider.findOrCreate({ where: data, defaults: data })
//     .spread((result, created) => {
//       return { result, created }
//     }).catch((error) => {
//       return { result: error, created: false, error: true }
//     })
//   },
//   removePatientProvider: (Patient_id, Provider_id) => {
//     return db.PatientProvider.findOne({where: { Patient_id, Provider_id }}).then((match) => {
//       if (!match) {
//         return { error: 'no match found' }
//       }
//       return db.PatientProvider.destroy({where: { id: match.id }}).then((result) => {
//         return { success: true }
//       })
//     })
//   },
//   // for testing purposes
//   findAllPatientProvider: () => {
//     return db.PatientProvider.findAll()
//   }

// }
