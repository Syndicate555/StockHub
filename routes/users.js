const express = require("express")
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middlewares/auth') // destructuring


// Login Page
router.get('/', ensureGuest, (req, res) => { // middleware applied
    res.render('login', {
     layout:'login'
    })
   })