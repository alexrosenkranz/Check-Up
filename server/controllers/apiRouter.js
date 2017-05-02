'use strict'
const express = require('express')
const router = express.Router()
const Query = require('./apiQueries')
const usersOnly = require('../auth/usersOnly')

// Make sure users are signed in before they can make an api calls
// router.use(usersOnly())

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

router.get('/patient/id', (req, res) => {
  let userId = req.user._id
  Query.findPatientById(userId).then((result) => {
    let userResult = result[0]
    return res.json(userResult)
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


module.exports = router
