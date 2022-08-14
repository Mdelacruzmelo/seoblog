const express = require('express')
const router = express.Router()
const { requireSignin, addUserToProfile } = require('../controllers/auth')
const { removeUserPasswordFromProfile } = require('../controllers/user')

router.get('/profile', requireSignin, addUserToProfile, removeUserPasswordFromProfile)

module.exports = router