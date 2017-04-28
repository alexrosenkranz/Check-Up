'use strict'
/* global it, describe, before */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = require('chai').expect
const assert = require('chai').assert
chai.use(dirtyChai)

const MONGOOSE_DB = require('../config').database
const Patient = require('../config').Patient
const Appointment = require('../config').Appointment

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
  // before((done) => {
  //   MONGOOSE_DB.connection.dropDatabase(err => {
  //     if (err) { console.log(err) }
  //     done()
  //   })
  // })
  before((done) => {
    MONGOOSE_DB.connection.dropDatabase(err => {
      if (err) { console.log(err) }
      const ptCollection = Patient.find({})
      const appCollection = Appointment.find({})
      // Check that all the collections are empty
      Promise.all([
        ptCollection,
        appCollection
      ]).then((results) => {
        results.forEach((result) => {
          expect(result).to.be.deep.equal([])
        })
        done()
      })
    })
  })

  // it('should be an empty "Patient" collection', (done) => {
  //   // v1
  //   Patient.find({}).exec((err, queryResult) => {
  //     if (err) { console.log(err) }
  //     // console.log(queryResult)
  //     expect(queryResult).to.be.deep.equal([])
  //     done()
  //   })
  // })

  it('should be able to enter a new patient', (done) => {
    const newPatient = new Patient(pt1)
    newPatient.save(function (err, ptDoc, numAff) {
      const ptObj = JSON.parse(JSON.stringify(ptDoc)) // hack, since ptDoc is a wrapper obj
      // console.log(ptObj)
      // console.log(ptDoc)
      // console.log('===================')
      // console.log(err)
      // console.log(ptDoc)
      // console.log(numAff)
      // expect(err).to.be.a('null')
      assert.isNull(err, 'there should not be an error')
      expect(ptObj).to.have.all.keys([
        '__v', 'first_name', 'last_name', 'email', 'password', '_id', 'appointments'
      ])
      assert.strictEqual(numAff, 1, 'should only affect 1 doc')
      done()
    })
  })

  it('should be able to find a patient given a username', (done) => {
    Patient.find({ username: pt1.username }).exec((err, results) => {
      const ptResultRaw = results[0]
      const ptResult = JSON.parse(JSON.stringify(ptResultRaw)) // hack, since ptDoc is a wrapper obj
      if (err) { console.log(err) }
      // console.log(ptResult)
      expect(ptResult).to.have.property('first_name', pt1.first_name)
      expect(ptResult).to.have.property('last_name', pt1.last_name)
      expect(ptResult).to.have.property('email', pt1.email)
      done()
    })
  })

  it('should be able to check that a password is right or wrong', (done) => {
    Patient.find({ username: pt1.username }).exec((err, results) => {
      if (err) { console.log(err) }
      const ptResult = results[0]
      try {
        const correctPassword = ptResult.checkPassword(pt1.password)
        const incorrectPassword = ptResult.checkPassword('wrongPassword')
        expect(correctPassword).to.be.true()
        expect(incorrectPassword).to.be.false()
        done()
      } catch (e) {
        done(e)
      }
    })
  })

  // it('should be able to find a patient with the username', (done) => {
  //   done()
  // })
})

