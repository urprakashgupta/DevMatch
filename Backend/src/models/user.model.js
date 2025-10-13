import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 40
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 40
    },
    emailId: {
        type: String,
        lowercase: true,
        require: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false,
        min: 18
    },
    gender: {
        type: String,
        required: false,
        trim: true
    }

});


export const User = mongoose.model("User", userSchema);