const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middlewares/auth') // destructuring
const Story  = require('../models/Story')
var handlebars = require('handlebars');
let alert = require('alert');  

// var popup = require('popups')
var hbtdate = require('handlebars-helper-formatdate')(handlebars);
const Register = require("../models/Registers")
// GET request Login/Landing Page
router.get('/login', ensureGuest, (req, res) => { // middleware applied
 res.render('login', {
  layout:'login'
 })
})

router.post('/login', ensureGuest, async (req, res) => { // middleware applied
   try {
       const email = req.body.email;
       const password = req.body.password;
       Register.findOne({email:email})
   } catch (error) {
       console.error(error)
       
   }
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
        if (password === cpassword){
            const registerUser = new Register({
                firstName : req.body.firstname,
                lastName: req.body.lastname,
                email : req.body.email,
                password : password,
                confirmpassword : cpassword
            })
            const registered = await registerUser.save();
            res.redirect('/')

        }else{
            alert("Passwords are not matching")
            // popup.alert({
            //     content:"Passwords are not matching"
            // })
            // res.send("passwords are not matching")
        }
    } catch (error) {
        // res.status(400).send(error)
        console.error(error)
        
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