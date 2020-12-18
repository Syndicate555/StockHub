const express = require('express')
const dotenv = require('dotenv')

//load config 
dotenv.config({path: './config/config.env'})
const app = express()
const PORT = process.env.PORT || 4545
app.listen(PORT, console.log(`Surver running in PORT ${PORT}`))
