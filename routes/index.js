const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middlewares/auth') // destructuring
const Story  = require('../models/Story')

// GET request Login/Landing Page
router.get('/', ensureGuest, (req, res) => { // middleware applied
 res.render('login', {
  layout:'login'
 })
})

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
    try {
        const stories = await Story.find({user: req.user.id}).lean()
        
    } catch (error) {
        
    }
 res.render('dashboard', {
     name:req.user.firstName
 })
})


module.exports = router