const express = require('express')
const router = express.Router()
const router = express.Router()


// GET request Authenticate with google
router.get('/google', passport.authenticate('google', { scope:['profile']}))


// Google auth callback 
// GET /
router.get('/google/callback', passport.authenticate())

module.exports = router