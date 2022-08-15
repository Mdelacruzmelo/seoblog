import User from '../models/user.js'
import shortId from 'shortid'
import expressJwt from 'express-jwt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const { expressjwt } = expressJwt

export const signup = (req, res) => {
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

export const signin = (req, res) => {

    const { email, password } = req.body

    // Check if user exists
    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: `User doest not exist. Please signup.`
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

export const signout = (_req, res) => {
    res.clearCookie('token')
    res.json({ message: 'Signout success' })
}

export const requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth"
});

export const authMiddleware = (req, res, next) => {
    const authUserId = req.auth._id
    User.findById({ _id: authUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: 'User not found.' })
        }
        req.profile = user
        next()
    })
}

export const adminMiddleware = (req, res, next) => {

    const adminUserId = req.auth._id

    User.findById({ _id: adminUserId }).exec((err, user) => {

        if (err || !user) {
            return res.status(400).json({ error: 'Admin user not found.' })
        }

        if (user.role !== 1) {
            return res.status(400).json({ error: 'Admin resource. Access denied.' })
        }

        req.profile = user
        next()
    })
}

export const canUpdateDeleteBlog = (req, res, next) => {
    const slug = req.params.slug.toLowerCase();
    Blog.findOne({ slug }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        let authorizedUser = data.postedBy._id.toString() === req.profile._id.toString();
        if (!authorizedUser) {
            return res.status(400).json({
                error: 'You are not authorized'
            });
        }
        next();
    });
};