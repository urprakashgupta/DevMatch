import express from 'express';
import userAuth from '../middlewares/auth.js';
import { validateEditProfileData } from '../utils/validation.js';
import bcrypt from 'bcryptjs';
const router = express.Router();

router.get('/view', userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(500).send("Error while fetching profile : " + error.message)
    }
})


router.patch('/edit', userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error('Invalid edit request');
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach(key => {
            loggedInUser[key] = req.body[key];
        });

        await loggedInUser.save();
        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfully ! `,
            data: loggedInUser,
        });
    } catch (error) {
        res.status(400).send('Error: ' + error.message);
    }
})

router.patch('/password', userAuth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            throw new Error('Please enter current and new password');
        }

        if (!validator.isStrongPassword(newPassword)) {
            throw new Error('Please enter strong password');
        }

        const loggedInUser = req.user;
        const isPasswordValid = await bcrypt.compare(
            currentPassword,
            loggedInUser.password
        );

        if (!isPasswordValid) {
            throw new Error('Invalid current password');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await loggedInUser.save();

        const { password, ...userData } = loggedInUser.toObject();

        res.json({
            message: `${loggedInUser.firstName}, your password updated successfully !`,
            data: userData,
        })
    } catch (error) {
        res.status(400).send('Error : ' + error.message)
    }
})

export default router;