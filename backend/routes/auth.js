import express from 'express'
import { signup, signin, signout, requireSignin } from '../controllers/auth.js'

// Validators
import { runValidation } from '../validators/index.js'
import { userSignupValidator, userSigninValidator } from '../validators/auth.js'

const router = express.Router()


router.post('/signup', userSignupValidator, runValidation, signup)
router.post('/signin', userSigninValidator, runValidation, signin)
router.get('/signout', signout)
// test
router.get('/secret', requireSignin, (req, res) => {
    res.json({ user: req.auth })
})

export default router