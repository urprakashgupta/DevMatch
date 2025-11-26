import mongoose, { Schema } from "mongoose";

const connectionRequestSchema = new Schema(
    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: {
                values: ["ignored", "accepted", "interested", "rejected"],
                message: `{VALUES} is incorrect status types`,
            }
        }
    },
    { timestamps: true }
);

connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;

    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send connection request to youreself")
    }
    next();
})

const connectionRequest = new mongoose.model(
    "connectionRequest",
    connectionRequestSchema
);


export default connectionRequest;