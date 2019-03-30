const mysql = require('mysql')

var pool
function init() {
    console.log('mysql pool init')
    let dbconfig = {
        host: '0.0.0.0',
        port: 3306,
        user: 'root',
        password: 'kedacom',
        database: 'xz'
    }
    dbconfig.connectonLimit = 10
    pool = mysql.createPool(dbconfig);

    pool.query('select * from xz_user limit 1 offset 0', [], (err, rows)=>{
        if(err) throw err;
        console.log(rows.length)
    })
}

function select(tablename, callback) {
    pool.query('select * from ?', [tablename, param], callback)
}

function mydelete(tablename, where, param, callback) {
    pool.query('delete from emp where eid = ?', [10], (err, result) => {
        console.log(result.affectedRows)
    })
}

function test(){
    pool.query('update  emp set salary = ? where eid = ?',
        [3000, 10], (err, result) => {
            console.log(result.affectedRows)
        });

    pool.query(`insert into dept values(?,?)`,
        [50, 'caiwu'], (err, result) => {
            if (err) throw err
            console.log(result.insertId)
        })

    var obj = { did: 'aaa', tentor: 123 }
    pool.query(`insert into dept SET ?`, obj, (err, result) => {
        if (err) throw err
        console.log(result.insertId)
    })
}

init()

module.exports = pool