import express from 'express'
import { requireSignin, adminMiddleware } from '../controllers/auth.js'
import { create, list, read, remove } from '../controllers/tag.js'

// Validators
import { runValidation } from '../validators/index.js'
import { tagCreateValidator } from '../validators/tag.js'

const router = express.Router()

router.post('/tag', tagCreateValidator, runValidation, requireSignin, adminMiddleware, create)
router.get('/tags', list)
router.get('/tag/:name', read)
router.delete('/tag/:name', requireSignin, adminMiddleware, remove)

export default router