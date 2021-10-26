const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');
const requireLogin = require('../middleware/requireLogin');


router.post('/signup', (req, res) => {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "please fill all the fields" });
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(400).json({ error: "user already exists" });
            }
            bcrypt.hash(password, 10)
                .then((hashPassword) => {
                    const user = new User({
                        name,
                        email,
                        password: hashPassword,
                        pic
                    })
                    user.save()
                        .then(user => {
                            return res.status(200).json({ message: "saved successfully" });
                        })
                        .catch(err => {
                            console.log(err);
                        })

                })
        })
        .catch(err => {
            console.log(err);
        })
})

router.post('/signin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "please enter email and password" });
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(400).json({ error: "Invalid email or password" });
            }
            bcrypt.compare(password, savedUser.password)
                .then((match) => {
                    if (match) {
                        //return res.status(200).json({ message: "User Successfully Signed in" })

                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        const {_id, name, email,followers,following, pic} = savedUser;
                        res.status(200).json({ token, user: {_id, name, email, followers, following, pic} });
                    }
                    else {
                        return res.status(400).json({ error: "Invalid email or password" });
                    }
                })
        })
})

module.exports = router;