import mongoose, { Schema } from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const userSchema = new Schema({
    firstName: { type: String, required: true, minLength: 3, maxLength: 50 },
    lastName: { type: String, required: true, minLength: 3, maxLength: 50 },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email');
            }
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 1024,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Password is not strong enough');
            }
        },
    },
    age: { type: Number, min: 18, max: 100 },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: '{VALUE} is not supported',
        },
    },
    photoUrl: {
        type: String,
        default:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Y9XKVnX7HjqC72X4vspygLD9H__mF-pDeA&s',
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error('Invalid Photo URL');
            }
        },
    },
    bio: {
        type: String,
        default: 'This is my bio',
        maxLength: 500,
    },
    skills: {
        type: [String],
        default: [],
        maxLength: 10,
    },
},
    {
        timestamps: true,
    }
);

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
}


userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;

}

const User = mongoose.model('User', userSchema);

export default User;