const mongoose = require('mongoose');
const Influencer = mongoose.Schema({
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
    AffiliateCode: {
        type: String,
        required: true
    },
    OwnCode: {
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

module.exports = mongoose.model('Influencer', Influencer);