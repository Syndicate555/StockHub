const mongoose = require('mongoose')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const Register = require('../models/Registers')
