let express = require('express');
let router = express.Router();

router.post('/', async function (req, res, next) {
    res.cookie('token', '', { maxAge: 0, httpOnly: true })
    res.json({
        code: 200,
        msg: '退出成功!'
    })
});

module.exports = router;
