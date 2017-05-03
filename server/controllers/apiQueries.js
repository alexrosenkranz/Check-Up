// const db = require('../db/models')
const Patient = require('../models/patient')
const Appointment = require('../models/appointment')
const Provider = require('../models/provider')
const Medication = require('../models/medication')
// const Medication = require('../models/medication')
// const moment = require('moment')

module.exports = {
  // ========== Patient Queries ========
  findAllPatients: () => {
    return Patient.find({}, { password: 0 })
    .populate('appointments')
    .populate('providers')
    .populate('medications')
  },
  findPatientByEmail: (email) => {
    return Patient.findOne({ email }, { password: 0 })
    .populate('appointments')
    .populate('providers')
    .populate('medications')
  },
  findPatientById: (_id) => {
    return Patient.find({ _id }, { password: 0 })
    .populate('appointments')
    .populate('providers')
    .populate('medications')
  },
  addPatient: (ptData) => {
    return new Promise((resolve, reject) => {
      const newPt = new Patient(ptData)
      newPt.save((err, doc) => {
        if (err) { reject(err) }
        resolve(doc)
      })
    }) // closes promise
  }, // ends addPatient

  // ========== Appointment Queries ========
  addAppointment: (email, appData) => {
    return new Promise((resolve, reject) => {
      // 1. Make a newApp
      const newApp = new Appointment(appData)
      newApp.save(function (err, appDoc, numAff) {
        if (err) { return reject(err) }
        // 2. find user, and append _id
        Patient.findOneAndUpdate(
          { email },
          { $push: { appointments: appDoc._id } },
          { new: true },
          function (err, doc) {
            if (err) { return reject(err) }
            resolve(doc)
          }
        )
      })
    })
  }, // ends addAppointment

  // ========== Provider Queries ========
  addProvider: (email, providerData) => {
    return new Promise((resolve, reject) => {
      const newProv = new Provider(providerData)
      newProv.save(function (err, provDoc, numAff) {
        if (err) { return reject(err) }
        Patient.findOneAndUpdate(
          { email },
          { $push: { providers: provDoc._id } },
          { new: true },
          function (err, ptDoc) {
            if (err) { return reject(err) }
            resolve(ptDoc)
          }
        )
      }) // closes .save
    }) // closes promise
  },

  // ========== Medicaiton Queries ========
  addMedication: (email, medData) => {
    return new Promise((resolve, reject) => {
      const newMed = new Medication(medData)
      newMed.save(function (err, medDoc, numAff) {
        if (err) { return reject(err) }
        Patient.findOneAndUpdate(
          { email },
          { $push: { medications: medDoc._id } },
          { new: true },
          function (err, doc) {
            if (err) { return reject(err) }
            resolve(doc)
          }
        )
      })
    })
  }
} // end of module.exports

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
