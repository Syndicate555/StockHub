const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Story = require('../models/Story')

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome', {
    layout:'login'
  }));

// Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    try {
        const stories = await Story.find({user: req.user.id}).lean()
        res.render('dashboard', {
            name:req.user.firstName,
            stories
        })

    } catch (error) {
        console.error(error)
        res.render('errors/500')
    }

})
module.exports = router;
