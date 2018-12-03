var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//路由拦截
app.use(function (req,res,next) {
    if(req.cookies.userId){
        next()
    }else{
        if(req.originalUrl ==='/users/login'||req.originalUrl === '/users/logout'||req.originalUrl.indexOf('/goods/list')>=0){
            next()
        }else{
            res.json({
                status: '1001',
                msg: '当前未登录',
                result: '当前未登录'
            })
        }
    }
});

app.use('/', indexRouter);
app.use('/users', usersRouter); //定义了一级路由；
app.use('/goods', goodsRouter); //定义了一级路由；

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
