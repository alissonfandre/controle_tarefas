var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//import do sequelize
const { Sequelize } = require('sequelize');

//criando a constante sequelize e passando as informações
const sequelize = require('./db');

sequelize.sync();

//models importaçoes
const Tarefa = require('./models/tarefa');

 const usuario = require('./models/usuario');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tarefasRouter = require('./routes/tarefasRouter');
var usuariosRouter = require('./routes/usuariosRouter');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tarefas', tarefasRouter);
app.use('/usuarios', usuariosRouter);


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
