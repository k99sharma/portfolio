var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res) {
  res.render('home.ejs');
  res.send(200);
});



module.exports = router;
