const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
//load config 
dotenv.config({path: './config/config.env'})

connectDB()
const app = express()
const PORT = process.env.PORT || 4545
app.listen(PORT, console.log(`Surver running in ${process.env.NODE_ENV} mode on port ${PORT}`))
