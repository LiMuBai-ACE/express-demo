let express = require('express');
let router = express.Router();
let uuid = require('node-uuid')     // 随机id
const { md5s } = require('../../utils/md5')
const { body, validationResult } = require('express-validator');   // 传入数据字段验证
const boom = require('boom');           // 返回错误信息
const { CODE_ERROR, CODE_SUCCESS, PRIVATE_KEY, JWT_EXPIRED } = require('../../utils/constant');  // 自定义的常量
const { sqlQuery } = require('../../utils/index')  // 自定义sql查询方法



router.post('/', async function (req, res, next) {
    const err = validationResult(req);
    // 检验字段是否都有值
    if (!err.isEmpty()) {
        const [{ msg }] = err.errors;
        next(boom.badRequest(msg));
    } else {
        // 查表是否已存在该用户
        let { email, password, mobile, role, confirm } = req.body;
        let sqlStr = 'select * from user where email = ?'
        let result = await sqlQuery(sqlStr, [email])
        if (result.length !== 0) {
            res.json({
                code: 101,
                msg: '用户已存在!',
                data: null
            })
        } else {
            // 去注册   密码加密存储
            password = md5s(password);
            confirm = md5s(confirm);
            // 默认的用户权限
            role ? role : 'user';
            sqlStr = `insert into user (user_id,email,avatar,password,confirm,role,mobile,create_time) values (?,?,?,?,?,?,?,?)`;
            // 生成用户id
            let user_id = uuid.v1();
            // 增加默认头像
            const avatar = 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3256100974,305075936&fm=26&gp=0.jpg';
            // 创建时间
            let create_time = new Date()
            result = await sqlQuery(sqlStr, [user_id, email, avatar, password, confirm, role, mobile, create_time])
            if (!result || result.length === 0) {
                res.json({
                    code: 0,
                    msg: '注册失败!',
                })
            } else {
                // const sqlStr = `select * from user where email='${email}' and password='${password}'`;
                // result = await sqlQuery(sqlStr)
                // 生成token
                // const token = jwt.sign({ email }, PRIVATE_KEY, { expiresIn: JWT_EXPIRED })
                // let userData = {
                //     user_id: result[0].user_id,
                //     email: result[0].email,
                //     mobile: result[0].mobile,
                //     role: result[0].role,
                //     caeate_time: result[0].caeate_time,
                // };

                res.json({
                    code: 200,
                    msg: '注册成功!',
                    // data: {
                    //     token,
                    //     userData
                    // }
                })
            }
        }
    }
});

module.exports = router;
