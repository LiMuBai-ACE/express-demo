const jwt = require('jsonwebtoken'); // 引入验证jsonwebtoken模块
const { PRIVATE_KEY } = require('./constant'); // 引入自定义的jwt密钥
const qs = require('qs')
function auth(req, res, next) {
  console.log(req.headers)
  Promise((relove, reject) => {
    console.log(qs, '====>')
    relove(1)
  })
  // try {
  //   const cookies = qs(req.headers.cookie)
  //   let add = decode(cookies.token)
  //   console.log(add)
  // } catch (error) {

  // }

  //注意啊这个字段是我们前端需要实现的，因为这是后台要求的
  // if (decode(cookies.token)) {
  //   next();
  // } else {
  //   res.status(401).send({ error: "Please authenticate." });
  // }

}


// jwt-token解析
function decode(token) {
  return jwt.verify(token, PRIVATE_KEY);
}

module.exports = {
  auth
}