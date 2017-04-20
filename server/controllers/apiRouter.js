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
router.get('/all-patients', (req, res) => {
  Query.findAllPatients().then((result) => {
    return res.json(result)
  })
})

router.post('/new-patient', (req, res) => {
  const { email, first_name, last_name, password } = req.body
  const patientData = { email, first_name, last_name, password }
  Query.addPatient(patientData).spread((patient, created) => {
    if (!created) {
      return res.json({error: true, msg: `Sorry there already is a patient with that email`})
    }
    return res.json({ patient, created })
  })
})

router.get('/patient/:id', (req, res) => {
  Query.findPatientById(req.params.id).then((result) => {
    return res.json(result)
  })
})

/** ======  Providers Queries ==========
 * GET api/v1/providers --> returns all providers info
 */
router.get('/all-providers', (req, res) => {
  Query.findAllProviders().then((results) => {
    res.json(results)
  })
})

router.post('/new-provider', (req, res) => {
  const { first_name, last_name, specialty, phone } = req.body
  const providerData = { first_name, last_name, specialty, phone }
  Query.addProvider(providerData).then((result) => {
    // const r = JSON.parse(JSON.stringify(result))
    // console.log(r)
    res.json(result)
  })
})

/** ======  PatientProvider Queries ==========
 * Should be able to:
 * 1) add new patient provider relationship
 * 2) remove a patient provider relationship
 */
router.post('/new-patient-provider', (req, res) => {
  const { patientId, providerId } = req.body
  Query.addPatientProvider(patientId, providerId)
  .spread((result, created) => {
    return res.json({ result, created })
    // return res.json({ result, created })
  }).catch((error) => {
    // return res.json({ result: error, created: false, error: true }) // maybe sanitize error msg?? for security?
    return res.json({ result: error, created: false, error: true })
  })
})

module.exports = router
