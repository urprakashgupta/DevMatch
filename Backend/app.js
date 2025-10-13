import express from 'express';
// import { adminAuth } from './src/middlewares/auth.js';
const app = express();
import { User } from './src/models/user.model.js';
import connectDB from './src/config/database.js';
import { configDotenv } from 'dotenv';
// app.use('/admin', adminAuth);

// app.use('/admin/adminData', (req, res) => {
//     res.send("hello from the admin data")
// });
configDotenv();
app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: "Mahendra singh",
        lastName: "Dhoni",
        emailId: "dhoni@gmail.com",
        password: "dhoni@123",
        age: "44",
        gender: "male"
    });
    try {
        await user.save();
        res.send("user saved successfully");
    } catch (err) {
        res.status(400).send("error saving the user" + err.message)
    }
}
)
connectDB().then(() => {
    app.listen(3000, () => {
        console.log("server is running on port 3000");

    })
}).catch((err) => {
    console.log("server running failed", err)

})