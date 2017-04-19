'use strict'
/* global it, describe, before */
// const chai = require('chai')
// const dirtyChai = require('dirty-chai')
// const expect = require('chai').expect
// chai.use(dirtyChai)

const models = require('../../server/db/models')

const title =
`
======================
UNIT TEST - test
======================
`

describe(title, () => {
  before(() => {
    return models.sequelize.sync({ force: true })
  })

  it('should just work ... right?', (done) => {
    done()
  })
})