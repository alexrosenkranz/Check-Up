// TO DO later ....
// abstract the clean database before function to make more DRY

// const chai = require('chai')
// const dirtyChai = require('dirty-chai')
// const expect = require('chai').expect
// chai.use(dirtyChai)

// // Load schemas
// const Patient = require('./config').Patient
// const Appointment = require('./config').Appointment
// const Provider = require('./config').Provider

// // ========= TESTING variables =========
// const pt1 = {
//   first_name: 'John',
//   last_name: 'Doe',
//   email: 'johndoe@gmail.com',
//   password: 'superSecret'
// }
// module.exports.patient1 = pt1

// // return this function??
// module.exports.cleanDatabase = function (mongooseDb, doneCb) {
//   mongooseDb.connection.dropDatabase(err => {
//     if (err) { console.log(err) }
//     // 1. make mult queries to find collection
//     const ptCollection = Patient.find({})
//     const appCollection = Appointment.find({})
//     const providerCollection = Provider.find({})
//     // 2. when all queries are done, expect all data to be empty
//     Promise.all([
//       ptCollection,
//       appCollection,
//       providerCollection
//     ]).then((results) => {
//       results.forEach((result) => {
//         expect(result).to.be.deep.equal([])
//       })
//       // add new patient
//       const newPatient = new Patient(pt1)
//       newPatient.save((err) => {
//         if (err) { console.log(err) }
//         doneCb()
//       })
//     }) // closes Promise.all
//   }) // closes dropDatabase
// }
