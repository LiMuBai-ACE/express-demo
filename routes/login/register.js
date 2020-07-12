let express = require('express');
let router = express.Router();
let uuid = require('node-uuid')     // 随机id
const md5 = require('../../utils/md5')
const { body, validationResult } = require('express-validator');   // 传入数据字段验证
const jwt = require('jsonwebtoken');   // 生成和解析token
const boom = require('boom');           // 返回错误信息
const { CODE_ERROR, CODE_SUCCESS, PRIVATE_KEY, JWT_EXPIRED } = require('../../utils/constant');  // 自定义的常量
const { sqlQuery } = require('../../utils/index')  // 自定义sql查询方法


router.get('/', function (req, res, next) {
    res.send('这是注册页')
});


router.post('/', async function (req, res, next) {
    const err = validationResult(req);
    // 检验字段是否都有值
    if (!err.isEmpty()) {
        const [{ msg }] = err.errors;
        next(boom.badRequest(msg));
    } else {
        // 查表是否已存在该用户
        let { mail, password, mobile, role, confirm } = req.body;
        let sqlStr = 'select * from user where mail = ?'
        let result = await sqlQuery(sqlStr, [mail])
        if (result.length !== 0) {
            res.json({
                code: CODE_ERROR,
                msg: '用户已存在',
                data: null
            })
        } else {
            // 去注册
            password = md5(password);
            sqlStr = `insert into user (user_id,mail,password,confirm,role,mobile,caeate_time) values (?,?,?,?,?,?,?)`;
            let user_id = uuid.v1();
            let caeate_time = new Date()
            result = await sqlQuery(sqlStr, [user_id, mail, password, confirm, role, mobile, caeate_time])
            if (!result || result.length === 0) {
                res.json({
                    code: CODE_ERROR,
                    msg: '注册失败',
                    data: null
                })
            } else {
                const sqlStr = `select * from user where mail='${mail}' and password='${password}'`;
                result = await sqlQuery(sqlStr)

                const token = jwt.sign({ mail }, PRIVATE_KEY, { expiresIn: JWT_EXPIRED })
                let userData = {
                    user_id: result[0].user_id,
                    mail: result[0].mail,
                    mobile: result[0].mobile,
                    role: result[0].role,
                    caeate_time: result[0].caeate_time,
                };

                res.json({
                    code: CODE_SUCCESS,
                    msg: '注册成功',
                    data: {
                        token,
                        userData
                    }
                })
            }
        }
    }
});

module.exports = router;
