import dotenv from 'dotenv'
import express from 'express'
import dbConnect from './config/db.js'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import listRoutes from './routes/listRoutes.js'
import cookieParser from 'cookie-parser'
dotenv.config()


const app =express()
const PORT = process.env.PORT
import './config/cloudinary.js'

//middleware
app.use(cors({
      origin: "http://localhost:5173",
    credentials: true}
))
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth',authRoutes)
app.use('/api/listings',listRoutes)

const startServer = async () => {
    try {
        await dbConnect(); 

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (err) {
        console.log("Server failed:", err);
    }
};

startServer();