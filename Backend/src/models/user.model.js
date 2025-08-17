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
        require: true
    }
})