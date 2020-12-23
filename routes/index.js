const express = require('express')
const router = express.Router()
const { retrieveUsers, checkUser } = require('../controllers/retrieveFromSheet')

router.get('/v1/load-sheet', retrieveUsers)

module.exports = router
