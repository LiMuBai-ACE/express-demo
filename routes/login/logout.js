const express = require('express');
const router = express.Router();
const auth = require('../../utils/auth')

router.get('/', async function (req, res, next) {
    res.json({
        code: 200,
        msg: '已退出,请重新登录!'
    })
});

module.exports = router;
