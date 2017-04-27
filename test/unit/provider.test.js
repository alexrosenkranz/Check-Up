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
// ===========================
// UNIT TEST - "provider" model
// ===========================
// `

// /**
//  * Testing Variables
//  */
// const provider1 = {
//   first_name: 'dr.',
//   last_name: 'oz',
//   specialty: 'tv',
//   phone: '10123456789'
// }

// const provider2 = {
//   first_name: 'Alex',
//   last_name: 'rosenkranz',
//   specialty: 'JavaScript',
//   phone: '9876543210'
// }

// describe(title, () => {
//   before(() => {
//     return models.sequelize.sync({ force: true })
//   })

//   it('should be an empty provider table', (done) => {
//     Query.findAllProviders().then((queryResults) => {
//       try {
//         assert.deepEqual(queryResults, [])
//         done()
//       } catch (e) {
//         done(e)
//       }
//     })
//   })

//   it('should be able to add a new provider', (done) => {
//     Query.addProvider(provider1).then((result) => {
//       let providerData = JSON.parse(JSON.stringify(result))
//       expect(providerData).to.contain.all.keys(
//         ['id', 'first_name', 'last_name', 'specialty', 'phone', 'updatedAt', 'createdAt']
//       )
//       done()
//     })
//   })

//   it('should be able to add another new provider', (done) => {
//     Query.addProvider(provider2).then((result) => {
//       let providerData = JSON.parse(JSON.stringify(result))
//       expect(providerData).to.contain.all.keys(
//         ['id', 'first_name', 'last_name', 'specialty', 'phone', 'updatedAt', 'createdAt']
//       )
//       done()
//     })
//   })

//   it('should be able to find all the providers', (done) => {
//     Query.findAllProviders().then((rawResults) => {
//       const searchResults = JSON.parse(JSON.stringify(rawResults))
//       expect(searchResults).to.have.lengthOf(2)
//       done()
//     })
//   })
// })
