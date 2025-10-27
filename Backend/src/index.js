import express from 'express';
import dotenv from 'dotenv';
import User from './models/user.models.js'
import connectDB from './config/database.js';

dotenv.config();
const app = express();
app.use(express.json());

// Route for user signup
app.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send("User signed up successfully");
    } catch (err) {
        res.status(400).send("Error while signup :" + err.message);
    }
})

// Route for fetching all users
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send("Error while fetching users :" + err.message);
    }
});

// Route for Updating User (Put request)
app.put('/user/:id', async (req, res) => {
    const userId = req.params.id;

    // don't allow updating email through this route
    if (req.body.email) {
        return res.status(400).send("Email cannot be updated through this route")
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).send("User not found");
        }
        res.send("User updated successfully");
    } catch (err) {
        res.status(500).send("user not found : " + err.message)
    }
})

// Route for updating User (Patch Request)
app.patch("/user/:id", async (req, res) => {
    const userId = req.params.id;
    const data = req.body;

    try {
        // Only allow certain fields to be updated
        const ALLOWED_UPDATES = ["photoURL", "about", "gender", "skills", "firstName", "lastName", "age"];
        const isAllowed = Object.keys(data).every((key) => ALLOWED_UPDATES.includes(key));

        if (!isAllowed) {
            return res.status(400).send("Update Not Allowed — You cannot change emailId");
        }
        if (data.skills && data.skills.length > 10) {
            return res.status(400).send("You can add maximum 10 skills");
        }
        const user = await User.findByIdAndUpdate(userId, data, { new: true });
        res.send({ message: "User updated successfully", user });
    } catch (err) {
        res.status(400).send("Something went wrong: " + err.message);
    }
});

// Route for deleting User
app.delete('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send("User deleted successfully");
    } catch (err) {
        res.status(500).send("Something went wrong : " + err.message)
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
