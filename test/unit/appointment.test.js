'use strict'
/* global it, describe, before, done */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = require('chai').expect
// const assert = require('chai').assert
chai.use(dirtyChai)

const moment = require('moment')

// const cleanDatabase = require('../cleanDatabase').cleanDatabase
const MONGOOSE_DB = require('../config').database
const Patient = require('../config').Patient
const Appointment = require('../config').Appointment
const Provider = require('../config').Provider
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
      const providerCollection = Provider.find({})
      // Check that all the collections are empty
      Promise.all([
        ptCollection,
        appCollection,
        providerCollection
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

// checks to make sure that Patient was entered properly. Could have put in before
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
