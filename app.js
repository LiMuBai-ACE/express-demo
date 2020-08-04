let express = require('express');
var router = express.Router();
let path = require('path');
let cors = require('cors');
let logger = require('morgan');   // 日志
// 引入上传模块
let multer = require('multer');
// 配置上传对象
let upload = multer({ dest: './public/upload' })


// 引入路由模块
let indexRouter = require('./routes/index/index');
let userRouter = require('./routes/user/index');
let adminRouter = require('./routes/admin/index');
let loginRouter = require('./routes/login/index');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//passport初始化
// app.use(jwtAuth);



app.use(logger('dev'));      // 日志   后期可以用来当作操作记录
app.use(express.json());      // 解析json数据格式
app.use(express.urlencoded({ extended: true }));   // 解析form表单提交的数据

app.use(cors(
    {
        origin: [
            'http://localhost:8000',
            'http://122.51.84.54:4000'
        ],
        credentials: true,
        // allowedHeaders: 'Content-Type,Authorization',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
    }
)); // 注入cors模块解决跨域


// 这是前台路由
app.use('/', indexRouter);
// 后台路由
app.use('/admin', adminRouter)
// 用户信息
app.use('/user', userRouter);
// 用户登录
app.use('/login', loginRouter);




// 自定义统一异常处理中间件，需要放在代码最后
app.use(function (err, req, res, next) {

    // if (req) {

    // }
    console.log(err, 'err')
    // 自定义用户认证失败的错误返回
    if (err && err.name === 'UnauthorizedError') {
        const { status = 401, message } = err;
        // 抛出401异常
        res.status(status).json({
            code: status,
            msg: 'token失效，请重新登录',
            data: null
        })
    } else {
        const { output } = err || {};
        // 错误码和错误信息
        const errCode = (output && output.statusCode) || 500;
        const errMsg = (output && output.payload && output.payload.error) || err.message;
        res.status(errCode).json({
            code: errCode,
            msg: errMsg
        })
    }
});

module.exports = app;
