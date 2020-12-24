const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middlewares/auth') // destructuring


// GET request Login/Landing Page
router.get('/', ensureGuest, (req, res) => { // middleware applied
 res.render('login', {
  layout:'login'
 })
})


router.get('/dashboard', ensureAuth, (req, res) => {
 res.render('dashboard', {
     name:req.user.firstName
 })
})


module.exports = router