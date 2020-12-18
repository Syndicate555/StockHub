const express = require('express')
const router = express.Router()


// GET request Authenticate with google
router.get('/google', passport.authenticate())


router.get('/dashboard', (req, res) => {
 res.render('dashboard')
})


module.exports = router