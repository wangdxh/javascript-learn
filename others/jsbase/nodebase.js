// base google v8
// .exit 退出
const htt = require('http')
const module1 = require('./module1')
const events = require('events')
global.console.log('a')
console.error('bbb') // 在浏览器会有区别

// 计算程序运行的时间
console.time('loop1')
// compute 
console.timeEnd('loop1')

//
console.log(process.arch, process.platform,
    process.version, process.env)
console.log(process.memoryUsage(), process.pid)

// 查看本进程运行时间
console.log(process.uptime())

// 一次性定时器
var timer1 = null

timer1 = setTimeout(() => {
    console.log('time is now')
}, 3000)

// 清楚定时器
clearTimeout(timer1)
timer1 = null

// 周期性的定时器
var timer2 = null
timer2 = setInterval(() => {
    console.log('timer2 interval')
    clearInterval(timer2)
    timer2 = null
}, 1000)

// 注意此处的打印时机
process.nextTick(() => console.log('next tick'))
// 立即定时器
setImmediate(() => console.log('immediate timer'))
console.log('after immi timer')

// 每个文件就是一个模块，局部作用域
// 每个文件隐藏着一个函数 
/* function(exports, require, module, __filename, __dirname)
{
    文件内的代码
} 
文件内所有的代码，都是被这个函数所包含的
*/
console.log(__dirname, __filename)
console.log('exports', exports)
console.log('require', typeof (require), require)
console.log('module', module)

// exports 通过参数传递进来，修改之后传递出去
// require 是一个函数 ，通过参数传递进来

console.log(module1.mul(3, 5), module1.sum(3, 5))

//require时，会自动寻找目录下面的index.js 其他名字则不行
//或者使用package.json文件指定 引入的时候，只需指定目录名称即可
/**
 * {
 *     "main" :"abc.js"
 *      
 * }
 */
// node_modules 会自动去本地node_modules目录下面去找模块，
// 不需要指定modules文件夹的名称

var buf1 = Buffer.alloc(5, '中abcd')
console.log(buf1, typeof (buf1), buf1.toString())

//------------------------------------------------------------------------

/**
 * 如果只有一次调用，也可以这么写，效果一样：

function runAsync(callback){
    setTimeout(function(){
    console.log('执行完毕');
    callback('xxx');
    }, 2000);
}
runAsync(function(data){
console.log(data);
});
 */


// node 全是回调，嵌套层次多了，会产生回调地狱
// 不就完蛋了,但是应该有些方法来解决的，比如部分同步接口
// 对于执行速度快的代码，不需要使用异步的方式，使用同步


/** Promise 接口函数应该返回Promise，
 * 然后数据回调和结果通过resolve
 * reject 等返回  
 * Promise的参数是一个function    
 * resolve 和 reject只会有一个执行，说明Promise执行是
 * 传递过来的resolve和reject是经过封装的，执行完成之后
 * 直接就跳出去了 有意思 
*/
function runAsync() {
    var promise1 = new Promise((resolve, reject) => {
        console.log('promise is over')
        setTimeout(() => {
            reject('reject bbb')
            resolve('resolve aaa')
        }, 100)
    })
    return promise1
}

runAsync().then((arg1) => {
    console.log(arg1)
}, (reson) => {
    console.log(reson)
})


function runAsync1() {
    var promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('异步1完成');
            resolve('xxx1');
        }, 200);
    });
    return promise;
}

function runAsync2() {
    var promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('异步2完成');
            resolve('xxx2');
        }, 500);
    });
    return promise;
}

function runAsync3() {
    var promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('异步3完成');
            resolve('xxx3');
        }, 500);
    });
    return promise;
}

runAsync1()
    .then(function (data) {
        console.log(data);
        return runAsync2();
    })
    .then(function (data) {
        console.log(data);
        return runAsync3();
    })
    .then(function (data) {
        console.log(data);
    });

setTimeout(() => {
    Promise.all([runAsync1(), runAsync2(), runAsync3()]).
    then((results)=>{
        console.log('promise all:',results)
    })    
}, 2000);    

setTimeout(() => {
    Promise.race([runAsync1(), runAsync2(), runAsync3()]).
    then((results)=>{
        console.log('promise race:', results)
    })    
}, 4000);


setTimeout(() => {
    var emitter1 = new events.EventEmitter()
    emitter1.on('connection', ()=>{
        console.log('connection ok')
        emitter1.emit('data_received')
    })
    // addListener 效果和 on一样 至少现在测试来看是这样
    emitter1.addListener('connection', ()=>{
        console.log('connection ok2')
        emitter1.emit('data_received')
    })

    emitter1.on('data_received', ()=>{
        console.log('data received ok')
    })

    emitter1.emit('connection')
    console.log('remove')    
    emitter1.removeAllListeners(['data_received'])
    emitter1.emit('connection')
    console.log('program is over')    
}, 5000);



