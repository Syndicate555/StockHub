const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middlewares/auth') // destructuring
const Story  = require('../models/Story')
var handlebars = require('handlebars');
var hbtdate = require('handlebars-helper-formatdate')(handlebars);
const Register = require("../models/Registers")
// GET request Login/Landing Page
router.get('/', ensureGuest, (req, res) => { // middleware applied
 res.render('login', {
  layout:'login'
 })
})

router.get('/register', ensureGuest, (req, res) => { // middleware applied
    res.render('register', {
     layout:'register'
    })
   })

// create a new registered user
router.post('/register', ensureGuest, async (req, res) => { 
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if (password ===cpassword){

        }else{
            res.send("passwords are not matching")
        }
    } catch (error) {
        res.status(400).send(error)
        
    }
    
   })


// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({user: req.user.id}).lean()
        res.render('dashboard', {
            name:req.user.firstName,
            stories
        })
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
 
})


module.exports = router