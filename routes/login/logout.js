const express = require('express');
const router = express.Router();
const auth = require('../../utils/auth')

router.get('/', auth.auth, async function (req, res, next) {
    res.json({
        code: 200,
        msg: '退出成功!'
    })
});

module.exports = router;
