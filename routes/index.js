var express = require('express');
var router = express.Router();


// GET homepage
router.get('/', function(req, res) {
  res.locals.current_page = "home";

  res.render('home.ejs');
});


// GET about page
router.get('/about', (req, res)=>{
  res.locals.current_page = "about";

  res.render('about.ejs');
});


// GET contact page
router.get('/contact', (req, res)=>{
  res.locals.current_page = "contact";

  res.render('contact.ejs');
});


// GET projects page
router.get('/projects', (req, res)=>{
  res.locals.current_page = "projects";

  res.render('projects.ejs');
});


module.exports = router;
