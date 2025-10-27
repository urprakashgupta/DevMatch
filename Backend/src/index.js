import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

dotenv.config();
const app = express()

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`server at running at port ${process.env.PORT}`);

        })
    })
    .catch((err) => {
        console.log("Server running failed", err);

    });
