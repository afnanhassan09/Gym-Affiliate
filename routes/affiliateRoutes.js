const express = require('express');
const router = express.Router();

const { createUser, verifyEmail, login } = require("../controllers/affiliateControllers.js");

router.route("/signup").post(createUser);
router.route('/verify-email').get(verifyEmail);
router.route('/login').post(login)

module.exports = router;