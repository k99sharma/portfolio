// projects CRUD feature

const express = require('express');
const router = express.Router();

// GET projects page
router.get('/addProjects', (req, res)=>{
    res.locals.current_page = 'addProjects';

    res.render('addProjects.ejs');
});



module.exports = router;