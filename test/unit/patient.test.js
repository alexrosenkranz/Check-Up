'use strict'
/* global it, describe, before */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = require('chai').expect
const assert = require('chai').assert
chai.use(dirtyChai)

const models = require('../../server/db/models')
const Query = require('../../server/controllers/apiQueries')

const title =
`
===========================
UNIT TEST - "patient" model
===========================
`

/**
 * Testing Variables
 */
const patientA = {
  email: 'john@gmail.com',
  first_name: 'john',
  last_name: 'doe'
}

const patientB = {
  email: 'jane@gmail.com',
  first_name: 'jane',
  last_name: 'doe'
}

describe(title, () => {
  before(() => {
    return models.sequelize.sync({ force: true })
  })

  it('should be an empty patient table', (done) => {
    Query.findAllPatients().then((queryResult) => {
      try {
        assert.deepEqual(queryResult, [])
        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('should be able to add a new patient', (done) => {
    Query.addPatient(patientA).spread((patient, created) => {
      const patientData = JSON.parse(JSON.stringify(patient)) // hack so you don't have to get .dataValues
      try {
        expect(patientData).to.contain.all.keys(
          ['id', 'email', 'first_name', 'last_name', 'updatedAt', 'createdAt']
        )
        expect(created).to.be.true()
        delete patientData.id
        delete patientData.updatedAt
        delete patientData.createdAt
        assert.deepEqual(patientData, patientA)
        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('should be able to add another new patient', (done) => {
    Query.addPatient(patientB).spread((patient, created) => {
      const patientData = JSON.parse(JSON.stringify(patient))
      try {
        expect(patientData).to.contain.all.keys(
          ['id', 'email', 'first_name', 'last_name', 'updatedAt', 'createdAt']
        )
        expect(created).to.be.true()
        delete patientData.id
        delete patientData.updatedAt
        delete patientData.createdAt
        assert.deepEqual(patientData, patientB)
        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('should not be able to add the same patient again', (done) => {
    Query.addPatient(patientB).spread((patient, created) => {
      const patientData = JSON.parse(JSON.stringify(patient))
      try {
        expect(patientData).to.contain.all.keys(
          ['id', 'email', 'first_name', 'last_name', 'updatedAt', 'createdAt']
        )
        expect(created).to.be.false()
        delete patientData.id
        delete patientData.updatedAt
        delete patientData.createdAt
        assert.deepEqual(patientData, patientB)
        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('should be able to find all patients entered', (done) => {
    Query.findAllPatients().then((results) => {
      const queryData = JSON.parse(JSON.stringify(results))  // sequelize hack yo
      try {
        expect(queryData).to.have.lengthOf(2)
        // test patient A
        expect(queryData[0]).to.contain.all.keys(
          ['id', 'email', 'first_name', 'last_name', 'updatedAt', 'createdAt']
        )
        delete queryData[0].id
        delete queryData[0].updatedAt
        delete queryData[0].createdAt
        assert.deepEqual(queryData[0], patientA)
        // test patient B? unnecessary probs ...
        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('should be able to find the first patient we entered', (done) => {
    Query.findPatientById(2).then((result) => {
      const patientData = JSON.parse(JSON.stringify(result))  // sequelize hack yo
      try {
        expect(patientData).to.contain.all.keys(
          ['id', 'email', 'first_name', 'last_name', 'updatedAt', 'createdAt']
        )
        delete patientData.id
        delete patientData.updatedAt
        delete patientData.createdAt
        assert.deepEqual(patientData, patientB)
        done()
      } catch (e) {
        done(e)
      }
    })
  })
})
