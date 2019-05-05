const express = require('express')
const pool = require('./pool')

var router = express.Router()

function fn(req, res, next) {
    console.log('use middle filter')
    next()
}
//拦截所有的路由，也可以拦截特定的路由
router.use(fn)
//-----------------------------------------------------

// 不调用next，就不会走到后置的中间件处理
router.get('/reg', (req, res, next) => {
    res.send('this is user reg.html')
})

router.get('/', (req, res, next) => {
    res.send('this is user list\n')
    next()
})

// 第二个也会被调用，但是如果已经send了，就不能再send了
// 但是其他逻辑会被处理
router.get('/', (req, res, next) => {
    console.log('this is user2 list')
    next()
})

router.post('/login', (req, res)=>{
    // 直接就是对象，已经解析完成，只能使用post的方式获取数据
    // 有body，才能进行body-parser
    console.log(req.body)
    res.send('this is test post list')
})

router.get('/login', (req, res)=>{
    console.log(req.query)
    res.send('this is test get list')  
})

router.get('/add', (req, res)=>{
    console.log(req.query)
    res.send('this is add get list')
})













//-----------------------------------------------------
// 放在后面就是后置中间件
router.use((req, res, next) => {
    console.log('middle filter 2')
    next()
})

module.exports = router