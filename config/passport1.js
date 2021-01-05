const mongoose = require('mongoose')
const User = require('../models/User')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const Register = require('../models/Registers')
