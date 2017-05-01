'use strict'
/* global it, describe, before */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = require('chai').expect
chai.use(dirtyChai)

const MONGOOSE_DB = require('../config').database
const Patient = require('../config').Patient
const Appointment = require('../config').Appointment
const Provider = require('../config').Provider
const Query = require('../../server/controllers/apiQueries')

const title =
`
==============================
UNIT TEST - Provider collection
==============================
`

// ========= TESTING variables =========
const provider1 = {
  first_name: 'Dr.',
  last_name: 'Oz',
  address: '123 main street',
  specialty: 'tv'
}

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
        // add the dumby patient
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

  it('should be able to enter a new provider', (done) => {
    Query.addProvider(pt1.email, provider1).then((result) => {
      // console.log(result)
      expect(result.providers).to.have.lengthOf(1)
      done()
    })
  })

  it('should be able to find providers for a given patient', (done) => {
    Query.findAllPatients().then((results) => {
      const pt1Result = results[0]
      const providers = pt1Result.providers
      providers.forEach((providerRaw) => {
        let provider = JSON.parse(JSON.stringify(providerRaw))
        // console.log(providerRaw)
        expect(provider).to.contain.all.keys(['first_name', 'last_name', 'address', 'specialty', '_id', '__v'])
      })
      done()
    })
  })
  // ---- end of its ----
})
