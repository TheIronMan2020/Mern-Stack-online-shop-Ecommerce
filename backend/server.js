import express from 'express'
import path from 'path'
import colors from 'colors'
import dotenv from  'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoute from './routes/uploadRoute.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", '*');
//     next();
// });

app.get('/', (req, res) => {
    res.send('API is running')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoute)

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_ID)
})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
// Error handler middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} port ${PORT}`.yellow.bold))