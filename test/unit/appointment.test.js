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
  appTime: moment().set({'month': 0, 'date': 1}).toISOString(),
  provider: 'Dr. Suess',
  notes: 'Working on my rhymes'
}

const app2 = {
  appTime: moment().set({'month': 2, 'date': 6}).toISOString(),
  provider: 'Dr. Carson',
  notes: 'Dont fall asleep'
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
      // console.log(result)
      expect(result.appointments).to.be.a('array')
      expect(result.appointments).to.have.lengthOf(1)
      done()
    })
  })

  it('should be able to add another appointment', (done) => {
    Query.addAppointment(pt1.email, app2).then((result) => {
      // console.log(result)
      expect(result.appointments).to.be.a('array')
      expect(result.appointments).to.have.lengthOf(2)
      done()
    })
  })

  it('should be able to find the appointments add for a user', (done) => {
    Query.findAllPatients().then((results) => {
      const pt1Result = results[0]
      const appPt1 = pt1Result.appointments
      expect(appPt1).to.be.a('array')
      expect(appPt1).to.have.lengthOf(2)
      appPt1.forEach((appRaw) => {
        // console.log(app)
        // let appTime = moment(app.appTime).format()
        // console.log(appTime)
        const app = JSON.parse(JSON.stringify(appRaw))
        // console.log(app)
        // console.log('-------------')
        expect(app).to.contain.all.keys(['_id', 'provider', 'notes', 'appTime'])
      })
      done()
    })
  })
  // ends all its
})
