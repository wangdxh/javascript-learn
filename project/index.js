const express = require('express')
const user = require('./router/user.js')
const login = require('./router/login.js')
const bodyParser = require('body-parser')


var app = express();
app.listen(80, ()=>{
    console.log('express listen ok')
})

//可以托管多个，当文件名字存在于两个文件夹时，显示按use顺序最先找到的那个
//app.use(express.static('./express-static'))
//
app.use(bodyParser.urlencoded({
    extended:false //不使用querystring的查询字符串
}))


app.use('/user', user)
app.use('/login', login)

app.get('/', (req, res)=>{
    res.redirect('/index.html')
})
