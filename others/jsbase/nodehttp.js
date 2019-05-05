const querystring = require('querystring')
const url = require('url')
const fs = require('fs')
const http = require('http')
const express = require('express')


var person = {
    name : 'tom',
    age : 222,
    gender : '男'
}

var qrystr2 = querystring.stringify(person)
console.log(qrystr2)
console.log(querystring.parse(qrystr2))

var obj1 = url.parse('https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=linux%20%E6%8C%87%E5%AE%9Ajiava%E7%9B%AE%E5%BD%95')
console.log(obj1, querystring.parse(obj1.query))

var urlobj = {
    protocol : 'https',
    hostname : 'www.bac.com',
    pathname : '/aaa/hhh.html',
    search : '?aaa=bbb'
}
console.log(url.format(urlobj))

fs.stat('base.js', (err, stats)=>{
    if(err)
    {
        console.log(err)
        return
    }
    console.log(err, stats)
    console.log(stats.isDirectory(), stats.isFile())
})
console.log('stat sync :', fs.statSync('base.js'))

// Sync的接口，会直接抛出异常
fs.mkdir('./test', (err) => console.log('mkdir err:', err))
// 等待创建成功，删除
setTimeout(()=>fs.rmdirSync('./test'), 500)

// 读取目录
fs.readdir('./', (err, files)=>{
    if(err) 
    {
        console.log(err); 
        return
    }
    console.log(files, typeof(files[0]))
})

fs.readFile('./module1.js', (err, data)=>{
    if(err) 
    {
        console.log(err); 
        return
    }
    // data Buffer 类型的数据
    console.log(data, data.toString())
})
// writeFile (err){} 会清空内容
// appendFile (err){} 追加内容
// unlink (err){}  delete file  

// http 请求
http.get('http://cn.bing.com', (res)=>{
    console.log(res.httpVersion, res.statusCode)
    var total = res.headers["content-length"], len = 0

    res.on('data', (buf)=>{
        len += buf.length
        console.log('bing:', buf.length)
        if(total == len) console.log('get all buffer over', len)
    })    
    // data 可能会多次返回
})

if(0){
    var server = http.createServer()
    server.listen(80, '0.0.0.0', ()=>{
        console.log('server listen ok')
    })
    server.on('request', (req, res)=>{
        console.log('new http request')
        res.writeHead(200, {'content-type':'text/html'})
        res.write('this is first http server')
        res.end()
    })
}

// npm install express -g
// npm install express-generator -g
// or npm install express --save
// 4.x 版本
var app = express();
app.listen(80, ()=>{
    console.log('express listen ok')
})

//http://127.0.0.1/list?aaa=bb
app.get('/list', (req, res)=>{
    console.log(req.query, req.ip, req.url)
    res.sendFile(__dirname+'/base.js')
})
app.get('/*', (req, res)=>{
    res.redirect('/list')
})






