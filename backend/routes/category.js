const express = require('express')
const router = express.Router()
const { create } = require('../controllers/category')

// Validators
const { runValidation } = require('../validators')
const { requireSignin, addAdminUserToProfile } = require('../controllers/auth')
const { categoryCreateValidator } = require('../validators/category')

router.post('/category', categoryCreateValidator, runValidation, requireSignin, addAdminUserToProfile, create)

module.exports = router