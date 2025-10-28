import express from 'express';
import { validateSignupData } from '../utils/validation.js';
import bcrypt from 'bcryptjs';
import User from '../models/user.models.js';
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        validateSignupData(req);

        const { firstName, lastName, email, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
        })

        const savedUser = await user.save();
        const token = await savedUser.getJWT();

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        })
        res.json({ message: "User signed up successfully", user: savedUser });
        res.status(500).send("Error saving user", error)
    } catch (error) {
        res.status(400).send("Error while signup :" + error.message);
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send("Invalid credentials");
        }
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            const token = await user.getJWT();
            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
            })
            res.send(user);
        } else {
            res.status(401).send("Invalid credentials");
        }

    } catch (error) {
        res.status(500).send("Error while login :" + error.message);
    }
})

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.send("Logged out successfully");
})

export default router;