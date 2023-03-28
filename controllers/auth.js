const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

exports.singup = async (req, res, next) => {
    const { userName, password, fullName, phoneNumber, email } = req.body;

    console.log(req.body.userName);
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            const error = new Error('User email exists, please choose another one');
            error.code = 401;
            throw error;
        }
        const hashedPassword = await bcryptjs.hash(password, 12);
        const user = new User({
            userName: userName,
            password: hashedPassword,
            fullName: fullName,
            phoneNumber: phoneNumber,
            email: email,
            isAdmin: false
        });
        const result = await user.save();
        res.status(201).json({ message: 'Created new user', userId: result._id.toString() });
    } catch (error) {
        if (!error.code) {
            error.code = 500;
        }
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error("User with this email can not found!");
            error.code = 401;
            throw error;
        }
        const isEqual = await bcryptjs.compare(password, user.password);
        console.log(password);
        console.log(isEqual);
        if (!isEqual) {
            const error = new Error('Wrong password');
            error.code = 401;
            throw error;
        }
        const token = jsonwebtoken.sign(
            {
                email: user.email,
                userId: user._id.toString()
            },
            'supersecret',
            {
                expiresIn: '2h'
            });

        console.log(user._id.toString());

        res.status(200).json({ token: token, userId: user._id.toString(), userName: user.userName, expiryDate: new Date() + 7200000 });
    } catch (error) {
        if (!error.code) {
            error.code = 500;
        }
        next(error);
    }

}


