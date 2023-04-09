const express = require('express');

const { body } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.put('/signup', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req }) => {
            return User.findOne({ email: value })
                .then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('Email exists already, please choose a different one!');
                    }
                });
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 5 }),
    body('name')
        .trim()
        .not()
        .isEmpty(),
    body('fullName')
        .trim()
        .not()
        .isEmpty(),
    body('phoneNumber')
        .trim()
        .not()
        .isEmpty()

], authController.singup);

router.post('/login', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 5 })
], authController.login);

module.exports = router;