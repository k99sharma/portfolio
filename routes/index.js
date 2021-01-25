var express = require('express');
var router = express.Router();

const Project = require('../models/project.js');


// GET homepage
router.get('/', function(req, res) {
  res.locals.current_page = "home";

  res.render('home.ejs');
});


// GET projects page
router.get('/projects', async (req, res)=>{
  res.locals.current_page = 'projects';

  const allProjects = await Project.find({});
 
  if(allProjects){
      console.log('Data is succefully retrieved!');
      console.log(allProjects);
      res.render('projects.ejs', {allProjects});
  }
  else{
      console.log('Data cannot be successfully retrieved!');
      res.redirect('/ghost_32/');
  }
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



module.exports = router;
