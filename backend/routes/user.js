import express from 'express'
import { requireSignin, userMiddleware } from '../controllers/auth.js'
import { removeUserPasswordFromProfile } from '../controllers/user.js'

const router = express.Router()

router.get('/profile', requireSignin, userMiddleware, removeUserPasswordFromProfile)

export default router