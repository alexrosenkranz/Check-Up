'use strict'
/* global it, describe, before, done */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = require('chai').expect
// const assert = require('chai').assert
chai.use(dirtyChai)

const moment = require('moment')

const MONGOOSE_DB = require('../config').database
const Patient = require('../config').Patient
const Appointment = require('../config').Appointment
const Provider = require('../config').Provider
const Medication = require('../config').Medication
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
const med1 = {
  drug_name: 'aspirin',
  doage: '75 milligrams',
  frequency: 'Once a day',
  directions: '',
  starting_date: moment().set({'month': 4, 'date': 1}).toISOString(),
  ending_date: moment().set({'month': 4, 'date': 7}).toISOString(),
}

describe(title, () => {
  before((done) => {
    MONGOOSE_DB.connection.dropDatabase(err => {
      if (err) { console.log(err) }
      const ptCollection = Patient.find({})
      const appCollection = Appointment.find({})
      const providerCollection = Provider.find({})
      const medicationCollection = Medication.find({})
      // Check that all the collections are empty
      Promise.all([
        ptCollection,
        appCollection,
        providerCollection,
        medicationCollection
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

  it('should be able to add a medication to a given patient', (done) => {
    Query.addMedication(pt1.email, med1).then((result) => {
      expect(result.medications).to.be.a('array')
      expect(result.medications).to.have.lengthOf(1)
      done()
    })
  })

  it('should be able to find the medication entered for a given patient', (done) => {
    Query.findPatientByEmail(pt1.email).then((result) => {
      console.log(result)
      done()
    })
  })
  // TO DO
  it('should be able to find read all the keys of the medication', (done) => {
    done()
  })
  it('should be able to convert the starting date and ending date in readable human form', (done) => {
    done()
  })

  // it('should be able to add a medication to a given patient', (done) => {
  //   done()
  // })
})

