const express = require('express')
const router = express.Router();

// get the dashboard page
router.get('/', (req, res)=>{
    res.render('dashboard')
})


// logout from your dashboard


module.exports = router