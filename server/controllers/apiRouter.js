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

/** ======  Patient Queries ==========
 * GET api/v1/patient --> returns all patient info
 * GET api/v1/patient/:id
 */
router.get('/patient', (req, res) => {
  Query.findAllPatients().then((result) => {
    return res.json(result)
  })
})

router.post('/patient', (req, res) => {
  const { email, first_name, last_name } = req.body
  const patientData = { email, first_name, last_name }
  Query.newPatient(patientData).spread((patient, created) => {
    if (!created) {
      return res.json({error: true, msg: `Sorry there already is a patient with that email`})
    }
    return res.json({ patient, created })
  })
})

router.get('/patient/:id', (req, res) => {
  Query.findPatientById(req.params.id).then((result) => {
    // console.log(result)
    return res.json(result)
  })
})

/** ======  Providers Queries ==========
 * GET api/v1/providers --> returns all providers info
 */
// router.get('/providers', (req, res) => {
//   return res.json({})
// })

module.exports = router
