const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs');
const passport = require('passport');
const alert = require('alert');
const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/chatrooms', ensureAuth, (req, res) =>res.render('chat', {
}));

module.exports = router
