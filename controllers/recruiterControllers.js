const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Recruiter = require("../models/userModel.js");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

const createUser = asyncHandler(async (req, res) => {
    let name = req.body.name;
    let pass = req.body.password;
    let email = req.body.email;
    console.log(name, pass, email);
    const hashedPass = await bcrypt.hash(pass, 10);

    const length = 8;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let referralCode = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        referralCode += characters[randomIndex];
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');

    const newUser = new Recruiter({
        name: name,
        email: email,
        password: hashedPass,
        referalCode: referralCode,
        verificationToken: verificationToken
    });

    await newUser.save();

    const verificationUrl = `${process.env.BACKEND_URL}/recruiter/verify-email?token=${verificationToken}`;

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Welcome to [Your Website Name] Community!',
        text: `Please verify your email by clicking on the following link: ${verificationUrl}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Verification email sent:', info.response);
    });

    res.status(201).send('User registered. Please check your email to verify your account.');
});

const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.query;

    const user = await Recruiter.findOne({ verificationToken: token });
    if (!user) {
        return res.status(400).send('Invalid verification token.');
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.send('Email verified successfully! You can now log in.');
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        const user = await Recruiter.findOne({ email: email });
        if (user) {
            if (user.isVerified) {
                const isMatch = await bcrypt.compare(password, user.password);

                if (isMatch) {
                    console.log("User found and password matches");
                } else {
                    console.log("Password is incorrect");
                }
            }
            else {
                console.log("The user in not verified");
            }
        } else {
            console.log("User not found");
        }
    } catch (error) {
        console.error(error);
    }
});



module.exports = {
    createUser,
    verifyEmail,
    login
};

