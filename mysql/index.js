/* 
    数据库基础配置
    host 地址
    port 端口号
    user 用户名
    password 密码
    database   数据库名
    connectTimeout: 连接超时
*/
const mysql = {
    host: "106.15.63.211",
    port: "3306",//可选，默认式3306
    user: "root",
    password: "Li-123456",
    database: "blog",
    connectTimeout: 5000
}




module.exports = mysql