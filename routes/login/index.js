const express = require('express');
const router = express.Router();
const { sqlQuery } = require('../../utils/index')  // 自定义sql查询方法
const { md5sProven } = require('../../utils/md5')
const { body, validationResult } = require('express-validator');   // 传入数据字段验证
const jwt = require('jsonwebtoken');   // 生成和解析token
const boom = require('boom');
const { CODE_ERROR, CODE_SUCCESS, PRIVATE_KEY, JWT_EXPIRED } = require('../../utils/constant');  // 自定义的常量
// 引入注册模块
let registerRouter = require('./register')
// 引入退出登录模块
let logoutRouter = require('./logout')

// 登录请求
router.post('/', async function (req, res, next) {
    const err = validationResult(req);
    // 检验字段是否都有值
    if (!err.isEmpty()) {
        const [{ msg }] = err.errors;
        next(boom.badRequest(msg));
    } else {
        // 查表是否已存在该用户
        let { email, password, } = req.body;
        let sqlStr = 'select * from user where email = ?'
        let result = await sqlQuery(sqlStr, [email])
        // 验证是否存在该用户
        if (result.length !== 0) {
            // 验证密码是否正确
            if (md5sProven(password, result[0].password)) {
                const token = jwt.sign({ email }, PRIVATE_KEY)
                // 服务端设置token
                res.cookie('token', token, { maxAge: JWT_EXPIRED, httpOnly: true })
                let userData = {
                    user_id: result[0].user_id,
                    avatar: result[0].avatar,
                    email: result[0].email,
                    mobile: result[0].mobile,
                    role: result[0].role,
                    caeate_time: result[0].caeate_time,
                };
                res.json({
                    code: 200,
                    msg: '登录成功',
                    // token,
                    data: userData
                })
            } else {
                res.json({
                    code: 101,
                    msg: '登录失败，密码输入不正确！',
                    data: null
                })
            }
        } else {
            res.json({
                code: 101,
                msg: '用户未注册',
                data: null
            })
        }
    }
});


// 注册路由
router.use('/register', registerRouter)
router.use('/logout', logoutRouter)


module.exports = router;
