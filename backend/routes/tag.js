const express = require('express')
const router = express.Router()
const { requireSignin, adminMiddleware } = require('../controllers/auth')
const { create, list, read, remove } = require('../controllers/tag')

// Validators
const { runValidation } = require('../validators')
const { tagCreateValidator } = require('../validators/tag')

router.post('/tag', tagCreateValidator, runValidation, requireSignin, adminMiddleware, create)
router.get('/tags', list)
router.get('/tag/:name', read)
router.delete('/tag/:name', requireSignin, adminMiddleware, remove)

module.exports = router