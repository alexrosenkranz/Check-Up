'use strict'
/* global it, describe, before */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = require('chai').expect
const assert = require('chai').assert
chai.use(dirtyChai)

const moment = require('moment')

const MONGOOSE_DB = require('../config').database
const Patient = require('../config').Patient
const Appointment = require('../config').Appointment
const Query = require('../../server/controllers/apiQueries')
const title =
`
==============================
UNIT TEST - appointment collection
==============================
`

// ========= TESTING variables =========
const pt1 = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'johndoe@gmail.com',
  password: 'superSecret'
}

const app1 = {
  appTime: moment().toISOString(),
  provider: 'Dr. Suess',
  notes: 'Working on my rhymes'
}

describe(title, () => {
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
        // add new patient
        const newPatient = new Patient(pt1)
        newPatient.save((err) => {
          if (err) { console.log(err) }
          done()
        })
      })
    })
  })


  it('should let me make a new appointment', (done) => {
    Query.addAppointment(pt1.email, app1).then((result) => {
      console.log(result)
      done()
    })
  })
})
