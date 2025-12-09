import express from 'express';
import userAuth from '../middlewares/auth.js';
import connectionRequest from '../models/connectionRequest.models.js';
import User from '../models/user.models.js';


const router = express.Router();

const USER_SAFE_DATA = [
    'firstName',
    'lastName',
    'photoUrl',
    'bio',
    'gender',
    'age'];

router.get("/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await connectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", USER_SAFE_DATA);

        res.json({
            message: "Data fetched successfully",
            data: connectionRequests,
        })
    } catch (error) {
        req.status(400).send("ERROR:" + error + message)
    }
});

router.get('/connections', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await connectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: 'accepted' },
                { fromUserId: loggedInUser._id, status: 'accepted' }
            ]
        })
            .populate('fromUserId', USER_SAFE_DATA)
            .populate('toUserId', USER_SAFE_DATA);

        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        })
        res.json({ data });
    } catch (error) {
        res.status(400).send("ERROR:" + error.message)
    }
});

router.get('/feed', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await connectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select('fromUserId toUserId');

        const hideUserFromFeed = new Set();

        connectionRequests.forEach((req) => {
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUserFromFeed) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        }).select(USER_SAFE_DATA)
        res.send(users)
    } catch (error) {
        res.status(400).json({ message: 'ERROR: ' + error.message });
    }
})

export default router;