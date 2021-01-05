const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middlewares/auth') // destructuring
const Story  = require('../models/Story')
const passport = require('passport')
const handlebars = require('handlebars');
const alert = require('alert');  
const Register = require("../models/Registers")
const hbtdate = require('handlebars-helper-formatdate')(handlebars);



// GET request Login/Landing Page


// Login Page
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




   

//checking the database for the login credentials


// create a new registered user
router.post('/register', ensureGuest, async (req, res) => { 
    try {
        const email = req.body.email;
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if (password === cpassword){
            Register.findOne({email:email}).then(user => {
                if (user){
                    
                }
            })
            const registerUser = new Register({
                firstName : req.body.firstname,
                lastName: req.body.lastname,
                email : email,
                password : password,
                confirmpassword : cpassword
            })
            const registered = await registerUser.save();
            res.redirect('/')

        }else{
            
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