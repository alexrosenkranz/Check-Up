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
    MONGOOSE_DB.connection.dropDatabase(err => {
      if (err) { console.log(err) }
      console.log('droped database from patient')
      done()
    })
  })

  it('should be an empty "Patient" collection', (done) => {
    // v1
    Patient.find({}).exec((err, queryResult) => {
      if (err) { console.log(err) }
      console.log(queryResult)
      done()
    })
    // v2
    // Patient.find({}, function (err, queryResult) {
    //   console.log(err)
    //   console.log(queryResult)
    //   done()
    // })
  })
})

