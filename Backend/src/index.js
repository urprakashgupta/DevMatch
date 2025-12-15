import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import authRouter from './routes/auth.js'
import profileRouter from './routes/profile.js';
import requestRouter from './routes/request.js';
import userRouter from './routes/user.js';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

// Auth Routes
app.use('/auth', authRouter);

//Profile Routes
app.use('/profile', profileRouter);


// Route for sendingConnectionRequest
app.use('/request', requestRouter);

//Route for userRouter
app.use('/user', userRouter);


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`server at running at port ${process.env.PORT}`);

        })
    })
    .catch((err) => {
        console.log("Server running failed", err);

    });
