'use strict'
const express = require('express')
const router = express.Router()
const checkLogin = require('../auth/checkLogin')

router.post('/login', function (req, res, next) {
  console.log(req.body)
  next()
}, checkLogin())

module.exports = router
