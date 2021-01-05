const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const Register = require('../models/Registers')

module.exports = function(passport){
  passport.use(
    new LocalStrategy({
      usernameField: 'email'
    })
  )
}


module.exports = function (passport) {
 passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
   callbackURL: '/auth/google/callback'
    
 }, async (accessToken, refreshToken, profile, done) => {
     // Populating the user Schema with the data from the google API
     const newUser = {
       googleId: profile.id,
       displayName: profile.displayName,
       firstName: profile.name.givenName,
       lastName: profile.name.familyName,
       image: profile.photos[0].value,
     }
     
     try {
       let user = await User.findOne({ googleId: profile.id })
       if (user) {
        //  console.log(profile)
         done(null, user)
       } else {
         user = await User.create(newUser) // creates a new user using the schema
         done(null, user)
       }
       
     } catch (error) {
       console.error(error)
       
     }
 }))
 passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}