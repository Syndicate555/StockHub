const express = require('express')
const router = express.Router()


// GET request Login/Landing Page
router.get('/', (req, res) => {
 res.send('Login')
})


router.get('/', (req, res) => {
 res.send('Dashboard')
})


module.exports = router