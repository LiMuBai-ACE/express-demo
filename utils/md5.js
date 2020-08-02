

const crypto = require('crypto'); // 引入crypto加密模块
const bcrypt = require('bcrypt'); // 引入bcrypt加密模块

function md5(s) {
  return crypto.createHash('md5').update('' + s).digest('hex');
}
function md5s(s) {
  return bcrypt.hashSync(s, 10);
}
// 
function md5sProven (s,w) {
  return bcrypt.compareSync(s, w);
}



module.exports = { md5s, md5,md5sProven };