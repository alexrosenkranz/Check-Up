'use strict'
/* global it, describe, before */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = require('chai').expect
const assert = require('chai').assert
chai.use(dirtyChai)

const MONGOOSE_DB = require('../config').database
const Patient = require('../config').Patient

const title =
`
==============================
UNIT TEST - patient collection
==============================
`

// ========= TESTING variables =========
const pt1 = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'johndoe@gmail.com',
  password: 'superSecret'
}

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
  })

  it('should be able to enter a new patient', (done) => {
    const newPatient = new Patient(pt1)
    newPatient.save(function (err, ptDoc, numAff) {
      const ptObj = JSON.parse(JSON.stringify(ptDoc)) // hack, since ptDoc is a wrapper obj
      // console.log(ptObj)
      // console.log('===================')
      // console.log(err)
      // console.log(ptDoc)
      // console.log(numAff)
      expect(err).to.be.a('null')
      expect(ptObj).to.have.all.keys([
        '__v', 'first_name', 'last_name', 'email', 'password', '_id'
      ])
      assert.strictEqual(numAff, 1, 'should only affect 1 doc')
      done()
    })
  })
})

