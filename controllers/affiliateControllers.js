const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Affiliate = require("../models/affiliateModel.js");
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
    let referal = req.body.referal;
    console.log(req.body);
    const recruiter = await Recruiter.findOne({ referalCode: referal });
    if (!recruiter) {
        res.status(201).send('No recruiter exist wih this referal code');
    }
    else {

        const verificationToken = crypto.randomBytes(32).toString('hex');
        const hashedPass = await bcrypt.hash(pass, 10);

        const newUser = new Affiliate({
            name: name,
            email: email,
            password: hashedPass,
            RecruiterCode: referal,
            verificationToken: verificationToken
        });
        recruiter.referals.push(email)
        await recruiter.save()
        await newUser.save();
        verificationUrl = `${process.env.BACKEND_URL}/affiliate/verify-email?token=${verificationToken}`;

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Welcome to affiliate Community!',
            text: `Please verify your email by clicking on the following link: ${verificationUrl}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Verification email sent:', info.response);
        });

        res.status(201).send('User registered. Please check your email to verify your account.');
    }
});

const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.query;

    const user = await Affiliate.findOne({ verificationToken: token });
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
        const user = await Affiliate.findOne({ email: email });

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

