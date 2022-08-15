import express from 'express'
import { requireSignin, authMiddleware } from '../controllers/auth.js'
import { removeUserPasswordFromProfile } from '../controllers/user.js'

const router = express.Router()

router.get('/profile', requireSignin, authMiddleware, removeUserPasswordFromProfile)

export default router