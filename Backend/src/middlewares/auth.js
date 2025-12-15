import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send('Please Login');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { id } = decoded;

        const user = await User.findById(id);
        if (!user) {
            return res.status(401).send('User not found');
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send('Error: ' + error.message)
    }
}

export default userAuth;