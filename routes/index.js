const express = require('express')
const router = express.Router()
const { retrieveUsers, checkUser } = require('../controllers/retrieveFromSheet')
// const { saveUsers } = require('../controllers/saveToSheet')

router.get('/v1/load-sheet', retrieveUsers)
router.get('/v1/check-user', checkUser)
// router.post('/v1/update/users', saveUsers)

module.exports = router
