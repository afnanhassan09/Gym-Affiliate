const mongoose = require('mongoose');
const Affiliate = mongoose.Schema({
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
    RecruiterCode: {
        type: String,
        required: true
    },
    affiliateCodes: {
        type: String,
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
})

module.exports = mongoose.model('Affiliate', Affiliate);