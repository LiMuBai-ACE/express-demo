/**
 * 描述: 连接mysql模块
 * 作者: Jack Chen
 * 日期: 2020-06-20
*/


const mysql = require('mysql');
const config = require('../mysql/index');

// 连接mysql
function connect() {
    const { host, user, password, database } = config;
    return mysql.createConnection({
        host,
        user,
        password,
        database
    })
}


// 多表查询 
function sqlQuery(strSql, arr) {
    const con = connect((err) => {
        //如果建立连接失败
        if (err) {
            console.log(err)
        } else {
            console.log('数据库连接成功')
        }
    });
    return new Promise(function (resolve, reject) {
        try {
            con.query(strSql, arr, (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        } catch (e) {
            reject(e);
        } finally {
            // 释放连接x
            con.end();
        }
    })
}

module.exports = {
    sqlQuery
}
