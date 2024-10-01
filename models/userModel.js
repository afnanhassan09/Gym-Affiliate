const mongoose = require('mongoose');
const Recruiter = mongoose.Schema({
    googleId: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    referalCode: {
        type: String,
        unique: true
    },
    numAffiliates: {
        type: Number,
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
    referrals: {
        type: [String]
    },
})


module.exports = mongoose.model('Recruiter', Recruiter);
