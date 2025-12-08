import express from 'express';
import userAuth from '../middlewares/auth.js';
import connectionRequest from '../models/connectionRequest.models.js';


const router = express.Router();

router.get("/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await connectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", [
            'firstName',
            'lastName',
            'photoUrl',
            'bio',
            'gender',
            'age',
        ]);

        res.json({
            message: "Data fetched successfully",
            data: connectionRequests,
        })
    } catch (error) {
        req.status(400).send("ERROR:" + error + message)
    }
})

export default router;