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
UNIT TEST - "provider" model
===========================
`

/**
 * Testing Variables
 */
const provider1 = {
  first_name: 'dr.',
  last_name: 'oz',
  specialty: 'tv',
  phone: '0123456789'
}

describe(title, () => {
  before(() => {
    return models.sequelize.sync({ force: true })
  })

  it('should be an empty provider table', (done) => {
    Query.findAllProviders().then((queryResults) => {
      try {
        assert.deepEqual(queryResults, [])
        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('should be able to add a new provider', (done) => {
    Query.addProvider(provider1).then((result) => {
      let providerData = JSON.parse(JSON.stringify(result))
      // console.log(providerData)
      expect(providerData).to.contain.all.keys(
        ['id', 'first_name', 'last_name', 'specialty', 'phone', 'updatedAt', 'createdAt']
      )
      done()
    })
  })
})
