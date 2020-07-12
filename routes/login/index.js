var express = require('express');
var router = express.Router();

// 引入注册模块
let registerRouter = require('./register')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('这是登录页')
});


// 注册路由
router.use('/register', registerRouter)


module.exports = router;
