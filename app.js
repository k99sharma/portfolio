var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var mongoSanitize = require('express-mongo-sanitize');

if(process.env.NODE_ENV !== 'production')
  require('dotenv').config();

var indexRouter = require('./routes/index');
var formRouter = require('./routes/forms_submission');
const adminRouter = require('./routes/adminRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(mongoSanitize());


// database connection setup
const dbURI = 'mongodb://localhost: 270181/portfolio';
const dbOptions = {useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(dbURI, dbOptions)
  .catch((err) => {
    console.log('Database connection failed !');
    next(err);
  })
  .then(()=>{
    console.log('Database connection successful !');
  })



// routes
app.use('/ghost_32', indexRouter);
app.use('/ghost_32', formRouter);
app.use('/ghost_32/admin', adminRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
