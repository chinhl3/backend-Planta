var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('./controller/userModel');
const cors= require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var proructsRouter = require('./routes/products');
var catecoryModelRouter = require('./routes/catecories');
var historyRouter =require('./routes/history');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// ket noi database
mongoose.connect('mongodb://localhost:27017/Assiment')
.then(()=>console.log('connected mongodb...'))
.catch(err=>console.log(err));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', proructsRouter);
app.use('/catecory', catecoryModelRouter);
app.use('/history', historyRouter);


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
