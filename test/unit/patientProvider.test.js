// 'use strict'
// /* global it, describe, before */
// const chai = require('chai')
// const dirtyChai = require('dirty-chai')
// const expect = require('chai').expect
// const assert = require('chai').assert
// chai.use(dirtyChai)

// const models = require('../../server/db/models')
// const Query = require('../../server/controllers/apiQueries')

// const title =
// `
// =====================================
// UNIT TEST - "PatientProvider" model
// =====================================
// `
// /**
//  * Testing Variables
//  */
// const patientA = {
//   email: 'john@gmail.com',
//   first_name: 'john',
//   last_name: 'doe',
//   password: 'password123'
// }

// const provider1 = {
//   first_name: 'dr.',
//   last_name: 'oz',
//   specialty: 'tv',
//   phone: '10123456789'
// }

// describe(title, () => {
//   before(() => {
//     return models.sequelize.sync({ force: true }).then(() => {
//       return Promise.all([
//         Query.addPatient(patientA),
//         Query.addProvider(provider1)
//       ])
//     })
//   })

//   it('should have a patient && provider in the database', (done) => {
//     Promise.all([
//       Query.findAllPatients(),
//       Query.findAllProviders()
//     ]).then((rawResults) => {
//       const resultArray = JSON.parse(JSON.stringify(rawResults))
//       expect(resultArray).to.have.lengthOf(2)
//       expect(resultArray[0][0]).to.include.keys(['email', 'password', 'Providers'])
//       expect(resultArray[1][0]).to.contain.all.keys(['specialty', 'phone'])
//       done()
//     })
//   })

//   it('should be an empty patient provider table', (done) => {
//     Query.findAllPatientProvider().then((rawResults) => {
//       const results = JSON.parse(JSON.stringify(rawResults))
//       assert.deepEqual(results, [])
//       done()
//     })
//   })

//   it('should be able to enter a new patient provider relationship', (done) => {
//     Query.addPatientProvider(1, 1).then((rawResult) => {
//       const queryResults = JSON.parse(JSON.stringify(rawResult))
//       expect(queryResults.created).to.be.true()
//       expect(queryResults.result).to.include.keys(['Patient_id', 'Provider_id'])
//       done()
//     })
//   })

//   it('should not be able to enter the same patient provider relationship', (done) => {
//     Query.addPatientProvider(1, 1).then((rawResult) => {
//       const queryResults = JSON.parse(JSON.stringify(rawResult))
//       expect(queryResults.created).to.be.false()
//       expect(queryResults.result).to.include.keys(['Patient_id', 'Provider_id'])
//       done()
//     })
//   })

//   it('should not be able to remove a  non-existent patient provider relationship', (done) => {
//     Query.removePatientProvider(-1, -1).then((queryResult) => {
//       expect(queryResult).to.have.property('error', 'no match found')
//       done()
//     })
//   })

//   it('should be able to remove a valid patient-provider relationship', (done) => {
//     Query.removePatientProvider(1, 1).then((queryResult) => {
//       expect(queryResult).to.have.property('success', true)
//       done()
//     })
//   })
// })
