var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goods = require('./routes/goods')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express)
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//登录拦截（这里是使用express路由中间件进行的访问拦截）
app.use(function (req, res, next) {
  //如果存在，代表已经登录
  if (req.cookies.userId) {//如果登录之后就没有访问限制了
    next()
  } else {//如果没有登陆，在进行某些验证，比如某些路径可以访问，某些路径不可以访问
    //originalUrl:代表当前接口地址
    console.log('path:' + req.path);
    if (req.originalUrl == '/users/login' || req.originalUrl == '/users/logout' || req.path == '/goods/list') {
      next()
    } else {
      res.json({
        status: '10001',
        msg: '当前未登录',
        result: ''
      })
    }
  }
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods', goods);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
