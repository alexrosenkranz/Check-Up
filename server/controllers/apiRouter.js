'use strict'
const express = require('express')
const router = express.Router()
const Query = require('./apiQueries')

router.get('/test', (req, res) => {
  res.json({
    test: true,
    msg: 'the test past if you can read this'
  })
})

/**
 * patient queries
 * GET api/v1/patient --> returns all patient info
 * GET api/v1/patient/:id
 */
router.get('/patient/:id', (req, res) => {
  Query.findPatientById(req.params.id).then((result) => {
    console.log(result)
    return res.json(result)
  })
})

module.exports = router
