const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User') // for google login
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const Register = require('../models/Registers') 