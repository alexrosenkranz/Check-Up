// 'use strict'
// /* global it, describe, before */
// const chai = require('chai')
// const dirtyChai = require('dirty-chai')
// const expect = require('chai').expect
// chai.use(dirtyChai)

// const MONGOOSE_DB = require('../config').database
// const Patient = require('../config').Patient
// const Appointment = require('../config').Appointment
// const Provider = require('../config').Provider
// const Query = require('../../server/controllers/apiQueries')

// const title =
// `
// ==============================
// UNIT TEST - default collection
// ==============================
// `

// describe(title, () => {
//   // before((done) => {
//   //   MONGOOSE_DB.connection.dropDatabase(err => {
//   //     if (err) { console.log(err) }
//   //     done()
//   //   })
//   // })
//   before((done) => {
//     MONGOOSE_DB.connection.dropDatabase(err => {
//       if (err) { console.log(err) }
//       const ptCollection = Patient.find({})
//       const appCollection = Appointment.find({})
//       // Check that all the collections are empty
//       Promise.all([
//         ptCollection,
//         appCollection
//       ]).then((results) => {
//         results.forEach((result) => {
//           expect(result).to.be.deep.equal([])
//         })
//         done()
//       })
//     })
//   })


//   it('should be an empty "Patient" collection', (done) => {
//     Patient.find({}).exec((err, queryResult) => {
//       if (err) { console.log(err) }
//       expect(queryResult).to.be.deep.equal([])
//       done()
//     })
//   })
// })

