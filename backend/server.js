import mongoose from 'mongoose'
import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import blogRoutes from './routes/blog.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import categoryRoutes from './routes/category.js'
import tagRoutes from './routes/tag.js'
import dotenv from 'dotenv'

dotenv.config()

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
app.use('/api', categoryRoutes)
app.use('/api', tagRoutes)

// cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }))
}

// port 
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
