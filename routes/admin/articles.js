var express = require('express');
var router = express.Router();
let uuid = require('node-uuid')     // 随机id
const { sqlQuery } = require('../../utils/index')  // 自定义sql查询方法

/* GET home page. */
// 列表
router.get('/list', async function (req, res, next) {
    let sqlStr = `select * from article_list`;
    result = await sqlQuery(sqlStr)
    res.send({ code: 200, data: result, msg: '成功' })
});
// 详情
router.post('/detail', async function (req, res, next) {
    let { id } = req.body;
    let sqlStr = `select * from article_list where id = ?`;
    result = await sqlQuery(sqlStr, [id])
    res.send({ code: 200, data: result[0], msg: '成功' })
});




// 创建新文章
router.post('/', async function (req, res, next) {
    const { content, user_id, title, profile } = req.body
    if (!content) return res.send({ code: 0, msg: '内容不能为空' })
    if (!user_id) return res.send({ code: 0, msg: 'user_id不能为空' })
    if (!title) return res.send({ code: 0, msg: '标题不能为空' })
    if (!profile) return res.send({ code: 0, msg: '简介不能为空' })
    let sqlStr = `insert into article_list (id,title,profile,content,user_id,create_time) values (?,?,?,?,?,?)`;
    // 生成文章id
    let id = uuid.v1();
    // 创建时间
    let create_time = new Date()
    result = await sqlQuery(sqlStr, [id, title, profile, content, user_id, create_time])
    if (!result || result.length === 0) {
        res.json({
            code: 0,
            msg: '提交失败!',
        })
    } else {
        res.json({
            code: 200,
            msg: '提交成功!',
        })
    }

});

module.exports = router;
