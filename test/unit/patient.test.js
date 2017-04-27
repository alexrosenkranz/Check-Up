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
UNIT TEST - patient collection
==============================
`

describe(title, () => {
  before((done) => {
    // v1
    // MONGOOSE_DB.connection.on('connected', () => {
    //   MONGOOSE_DB.connection.db.dropDatabase()
    //   console.log('dropping db')
    //   done()
    // })

    // v2
    // db.connection.collections['Patient'].drop(function (err) {
    //   if (err) { console.log(err) }
    //   console.log('collection dropped')
    //   done()
    // })

    // v3
    // db.connect(process.env.MONGODB_URI_TESTING, function () {
    //   db.connection.db.dropDatabase()
    // })
    // v4
    // MONGOOSE_DB.connection.db.dropDatabase(() => {
    //   console.log('droped database from patient')
    //   done()
    // })
    // v5
    MONGOOSE_DB.connection.dropDatabase(err => {
      if (err) { console.log(err) }
      console.log('droped database from patient')
      done()
    })
  })

  it('should be an empty "Patient" collection', (done) => {
    Patient.find({}).exec((err, queryResult) => {
      // console.log(err) // should be null
      console.log(queryResult)
      done()
    })
  })
})

