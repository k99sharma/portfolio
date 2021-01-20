var express = require('express');
var router = express.Router();


// GET homepage
router.get('/', function(req, res) {
  res.locals.current_page = "home";

  res.render('home.ejs');
  res.send(200);
});


// GET about page
router.get('/about', (req, res)=>{
  res.locals.current_page = "about";

  res.render('about.ejs');
  res.send(200);
});

// GET contact page
router.get('/contact', (req, res)=>{
  res.locals.current_page = "contact";

  res.render('contact.ejs');
  res.send(200);
});



module.exports = router;
