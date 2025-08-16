import express from 'express';
import { adminAuth } from './middlewares/auth.js';
const app = express();

app.use('/admin', adminAuth);

app.use('/admin/adminData', (req, res) => {
    res.send("hello from the admin data")
});

app.use('/user', (req, res) => {
    res.send("hello from the user")
})

app.listen(3000, () => {
    console.log('server is listening on port 3000');

})