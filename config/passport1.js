const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User') // for google login
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const Register = require('../models/Registers') 

module.exports = function(passport){
    passport.use(
      new LocalStrategy({
        usernameField: 'email'
      }, (email, password, done) => {
        // Match User
        User.findOne({ email: email}).then(user => {
          if (!user) {
            return done(null, false, {message: 'That email is not registered'})
          }
          // match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch){
              return done(null, user);
            } else{
              return done(null, false, {message: 'Password incorrect'})
            }
          })
        })
      })
    )
  }