require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Message = require('../models/Message');

const bcryptSalt = bcrypt.genSaltSync(10);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(user);
    } catch {
        res.status(422).json(e);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // search for a user that matches an email
    const user = await User.findOne({ email });

    if (user) {
        // if user exists, use bcrypt to compare passwords
        const passwordOk = bcrypt.compareSync(password, user.password);
        if (passwordOk) {
            // if password matches, create a token with user data and send it as a cookie
            jwt.sign(
                { email: user.email, id: user._id },
                process.env.jwtSecret,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(user);
                }
            );
        }
    } else {
        res.status(422).json('Not found');
    }
});

router.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

router.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json(null);
    }
});

router.post('/newMessage', async (req, res) => {
    const { message } = req.body;
    const { token } = req.cookies;

    if (token) {
        jwt.verify(token, process.env.jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const currentUser = await User.findById(userData.id);
            const messageDoc = await Message.create({
                user: currentUser,
                time: new Date(),
                body: message,
            });
            res.json(messageDoc);
        });
    } else {
        res.json(null);
    }
});

router.get('/messages', async (req, res) => {
    const messages = await Message.find();
    res.json(messages);
});

module.exports = router;
