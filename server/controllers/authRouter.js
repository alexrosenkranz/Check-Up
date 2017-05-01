'use strict'
const express = require('express')
const router = express.Router()
const checkLogin = require('../auth/checkLogin')

router.post('/login', checkLogin())

module.exports = router
