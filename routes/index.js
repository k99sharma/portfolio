var express = require('express');
var router = express.Router();


// GET homepage
router.get('/', function(req, res) {
  res.locals.current_page = "home";

  res.render('home.ejs');
  res.send(200);
});



module.exports = router;
