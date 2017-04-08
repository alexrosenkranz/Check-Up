'use strict'
const express = require('express')
const router = express.Router()

router.get('/test', (req, res) => {
  res.json({
    test: true,
    msg: 'the test past if you can read this'
  })
})

module.exports = router
