import mongoose, { Schema } from 'mongoose';

const connectionRequestSchema = new Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: {
            values: ['ignored', 'accepted', 'rejected', 'interested'],
            message: '{VALUE} is not supported',
        },
        required: true,
    }
},
    {
        timestamps: true,
    }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

connectionRequestSchema.pre('save', function (next) {
    const connectionRequest = this;

    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        return next(Error('Cannot send connection request to yourself'))
    }
    next();
});

const connectionRequest = mongoose.model(
    'connectionRequest',
    connectionRequestSchema
);

export default connectionRequest;