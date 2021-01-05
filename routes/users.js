const express = require("express")
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middlewares/auth') // destructuring

