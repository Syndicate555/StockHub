const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middlewares/auth') // destructuring
const Story  = require('../models/Story')
const passport = require('passport')

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

// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
//     res.redirect('/dashboard')
//    })
   


router.post('/login', ensureGuest, async (req, res) => { // middleware applied
   try {
       const email = req.body.email;
       const password = req.body.password;
       const useremail = await Register.findOne({email:email})
       console.log(useremail)
       console.log(password)
       if (useremail.password === password){
           res.status(201).render("dashboard")
       } else{
           alert("invalid password")
       }
   } catch (error) {
       console.error(error)
       alert("Invalid email")
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
            res.redirect('/login')

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