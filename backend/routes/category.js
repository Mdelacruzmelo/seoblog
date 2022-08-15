import express from 'express'
import { create, list, read, remove } from '../controllers/category.js'

// Validators
import { runValidation } from '../validators/index.js'
import { requireSignin, adminMiddleware } from '../controllers/auth.js'
import { categoryCreateValidator } from '../validators/category.js'

const router = express.Router()

router.post('/category', categoryCreateValidator, runValidation, requireSignin, adminMiddleware, create)
router.get('/categories', list)
router.get('/category/:slug', read)
router.delete('/category/:slug', requireSignin, adminMiddleware, remove)

export default router