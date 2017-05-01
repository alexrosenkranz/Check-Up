'use strict'
const express = require('express')
const router = express.Router()
const Query = require('./apiQueries')
const usersOnly = require('../auth/usersOnly')

router.get('/test', usersOnly(), (req, res) => {
  res.json({
    test: true,
    msg: 'the test past if you can read this'
  })
})

/** ======  Patient Queries ==========
* Find all patients (ADMIN), get patient by username, by id
* POST
*/
router.get('/all-patients', (req, res) => {
  Query.findAllPatients().then((result) => {
    return res.json(result)
  })
})

router.get('/patient/username/:email', (req, res) => {
  Query.findPatientByEmail(req.params.email).then((result) => {
    return res.json(result)
  })
})

router.get('/patient/id/:_id', (req, res) => {
  Query.findPatientById(req.params._id).then((result) => {
    return res.json(result)
  })
})

router.post('/new-patient', (req, res) => {
  const { email, first_name, last_name, password } = req.body
  const ptData = { email, first_name, last_name, password }
  Query.addPatient(ptData).then((result) => {
    res.json(result)
  }).catch((err) => {
    res.json(err)
  })
})


// /** ======  Providers Queries ==========
//  * GET api/v1/providers --> returns all providers info
//  */
// router.get('/all-providers', (req, res) => {
//   Query.findAllProviders().then((results) => {
//     res.json(results)
//   })
// })

// router.post('/new-provider', (req, res) => {
//   const { first_name, last_name, specialty, phone } = req.body
//   const providerData = { first_name, last_name, specialty, phone }
//   Query.addProvider(providerData).then((result) => {
//     res.json(result)
//   })
// })

// /** ======  PatientProvider Queries ==========
//  * Should be able to:
//  * 1) add new patient provider relationship
//  * 2) remove a patient provider relationship
//  */

// /**
//  * @return result {object} - has key of result, created. If error, returns a key of error, and erro msg in result.
//  */
// router.post('/new-patient-provider', (req, res) => {
//   const { patientId, providerId } = req.body
//   Query.addPatientProvider(patientId, providerId).then((result) => {
//     res.json(result)
//   })
// })

// /**
//  * @return result {object} - either has key of error: 'error msg', or key of success: true
//  */
// router.post('/remove-patient-provider', (req, res) => {
//   const { patientId, providerId } = req.body
//   // TO DO: autentication, make sure user's id === patientId or something like that
//   // so you can't destroy someone else's data
//   Query.removePatientProvider(patientId, providerId).then((result) => {
//     res.json(result)
//   })
// })

module.exports = router
