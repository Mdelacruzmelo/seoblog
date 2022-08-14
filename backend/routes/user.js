const express = require('express')
const router = express.Router()
const { requireSignin, userMiddleware } = require('../controllers/auth')
const { removeUserPasswordFromProfile } = require('../controllers/user')

router.get('/profile', requireSignin, userMiddleware, removeUserPasswordFromProfile)

module.exports = router