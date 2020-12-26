const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middlewares/auth') // destructuring
const Story  = require('../models/Story')

// GET request Login/Landing Page
router.get('/', ensureGuest, (req, res) => { // middleware applied
 res.render('login', {
  layout:'login'
 })
})




module.exports = router