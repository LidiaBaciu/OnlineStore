import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes  from './routes/userRouters.js'
import Product from './models/productModel.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

dotenv.config({ override: true })

connectDB()

const { NODE_ENV } = process.env

const app = express()

//accept json data in the body
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)

//error middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold))

