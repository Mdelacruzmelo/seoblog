const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
// const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

require('dotenv').config()

// app
const app = express()

// db
mongoose
    .connect(process.env.DATABASE_CLOUD, { useNewUrlParser: true })
    .then(() => {
        console.log("Database connected")
    })
    .catch((error) => {
        console.error('~ error', error)
    })

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
// app.use(bodyParser.json())

// Route middlewares
app.use('/api', blogRoutes)
app.use('/api', authRoutes)
app.use('/api', userRoutes)

// cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }))
}

// port 
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
