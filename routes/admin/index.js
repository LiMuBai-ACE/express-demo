var express = require('express');
var router = express.Router();


// 引入路由模块
var articlesRouter = require('./articles');
var studentsRouter = require('./students');
var teachersRouter = require('./teachers');
var usersRouter = require('./users');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('后台首页');
});



// 用户管理
router.use('/users', usersRouter);


// 新闻管理
router.use('/articles', articlesRouter);


// 学生管理
router.use('/students', studentsRouter);


// 老师管理
router.use('/teachers', teachersRouter);











module.exports = router;
