// 'use strict'
// /* global it, describe, before */
// // const chai = require('chai')
// // const dirtyChai = require('dirty-chai')
// // const expect = require('chai').expect
// // chai.use(dirtyChai)

// const models = require('../../server/db/models')

// const title =
// `
// ======================
// UNIT TEST - test
// ======================
// `

// describe(title, () => {
//   before(() => {
//     return models.sequelize.sync({ force: true })
//   })

//   it('should just work ... right?', (done) => {
//     done()
//   })
// })

'use strict'
/* global it, describe, before */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = require('chai').expect
chai.use(dirtyChai)

const MONGOOSE_DB = require('../config').database
const Patient = require('../config').Patient

const title =
`
==============================
UNIT TEST - default collection
==============================
`

describe(title, () => {
  before((done) => {
    // DROPPING DATABASE
    // v1
    // MONGOOSE_DB.connection.db.dropDatabase(() => {
    //   console.log('droped database from default')
    //   done()
    // })
    // v2
    MONGOOSE_DB.connection.dropDatabase(err => {
      if (err) { console.log(err) }
      console.log('droped database from patient')
      done()
    })
    // MONGOOSE_DB.connection.on('connected', () => {
    //   MONGOOSE_DB.connection.db.dropDatabase()
    //   console.log('dropping db')
    //   done()
    // })
  })

  it('should be an empty "Patient" collection', (done) => {
    Patient.find({}).exec((err, queryResult) => {
      // console.log(err)
      console.log(queryResult)
      done()
    })
  })
})

