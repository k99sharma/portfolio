const express = require('express');
const router = express.Router();

// GET admin page
router.get('/', (req, res)=>{
    res.locals.current_page = 'adminPage';

    res.render('adminPage.ejs');
});


// GET new project entry


module.exports = router;