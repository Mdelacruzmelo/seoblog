const User = require('../models/user')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const user = require('../models/user')

exports.signup = (req, res) => {

    const { name, email, password } = req.body

    User.findOne({ email })
        .exec((_err, user) => {
            if (user) {
                return res
                    .status(400)
                    .json({ error: `email ${email} is taken` })
            }

            let username = shortId.generate()
            let profile = `${process.env.CLIENT_URL}/profile/${username}`

            let newUser = new User({
                name, email, password, profile, username
            })
            newUser.save((err, _success) => {
                if (err) return res.status(400).json({ error: err })
                res.json({ message: 'Signup success! Please signin.' })
                // res.json({ user: success })
            })

        })

}

exports.signin = (req, res) => {

    const { email, password } = req.body

    // Check if user exists
    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email doest not exist. Please signup.'
            })
        }

        // authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password did not match.'
            })
        }

        // generate a jwtand send to client
        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.cookie('token', token, { expiresIn: '1d' })
        const { _id, username, name, email, role } = user
        return res.json({
            token,
            user: {
                _id, username, name, email, role
            }
        })

    })


}