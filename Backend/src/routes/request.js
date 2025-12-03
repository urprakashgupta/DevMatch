import express from 'express';
const router = express.Router();

import userAuth from '../middlewares/auth.js';
import User from '../models/user.models.js';
import ConnectionRequest from '../models/connectionRequest.models.js'

router.post("/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ['interested', 'ignored'];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: 'Invalid status type : ' + status });
        }

        //check if user exit or not in db

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(400).json({ message: "User not found !!" })
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (existingConnectionRequest) {
            return res.status(400).send({ message: "Connection request already Exists !!" })
        }



        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        let message = "";

        if (status === "interested") {
            message = `${req.user.firstName} is interested in ${toUser.firstName}`;
        } else if (status === "ignored") {
            message = `${req.user.firstName} has ignored ${toUser.firstName}`;
        }

        return res.status(201).json({
            success: true,
            message,
            data,
        });
    } catch (err) {
        res.status(400).send('ERROR: ' + err.message);
    }
})

router.post("/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        const allowedStatus = ['accepted', 'rejected'];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json("Invalid status types : " + status);
        }
        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: 'interested',
        });

        if (!connectionRequest) {
            return res.status(404).json({ message: 'Connection request not found' });
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();

        res.json({
            message: "Connection request " + status,
            data
        })

    } catch (error) {
        res.status(400).send('Error: ' + error.message);
    }
});


export default router;