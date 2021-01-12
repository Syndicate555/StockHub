// Code for authenticating and logging in with google
const express = require('express')
const router = express.Router()
const passport = require('passport')

// GET request Authenticate with google
router.get('/google', passport.authenticate('google', { scope:['profile']}))


// Google auth callback 
// GET request
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {

 res.redirect('/dashboard')
})

//@desc Logout User 

// router.get('/logout', (req, res) => {
//  req.logout()
//  res.redirect('/')
// })

module.exports = router