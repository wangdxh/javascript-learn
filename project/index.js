const express = require('express')
const user = require('./router/user.js')
const login = require('./router/login.js')
const bodyParser = require('body-parser')


var app = express();

app.use(express.static(__dirname+'/static'))

app.use(bodyParser.urlencoded({
    extended:false //不使用querystring的查询字符串
}))
app.use(bodyParser.json())
app.use(login.passport.initialize())
//app.use(login.passport.session({session:false}))

app.use('/login', login.router)

// use jwt token
app.use(login.passport.authenticate("jwt", { session: false, failureRedirect: '/login'}))

app.use('/user', user)
app.get('/', (req, res)=>{
    console.log('in user:', req.user, req.isAuthenticated())
    res.send('this is main html')
})



app.listen(8080, ()=>{
    console.log('express listen ok')
})