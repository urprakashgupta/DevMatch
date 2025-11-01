import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import userAuth from './middlewares/auth.js';
import authRouter from './routes/auth.js'
import profileRouter from './routes/profile.js'
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

// Auth Routes
app.use('/auth', authRouter);

//Profile Routes
app.use('/profile', profileRouter);


// Route for sendingConnectionRequest
app.post('/sendConnectionRequest', userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user.firstName + " sent the connection request")
    } catch (error) {
        res.status(500).send("Error while sending request : " + error.message)
    }
})


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`server at running at port ${process.env.PORT}`);

        })
    })
    .catch((err) => {
        console.log("Server running failed", err);

    });
