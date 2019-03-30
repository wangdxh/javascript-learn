console.log('hello, world');

var x
x = 'abc'
var m1 = 3, m2 = 4
var m3 = undefined, $m4 = 5.0
var aaa = 0123, aaa1 = 0x123
const PI = 3.4

// unicode码
console.log('我喜欢'.charCodeAt(1).toString(16))
console.log('abc'.charCodeAt(1).toString(16))
console.log('abc'.charCodeAt().toString(16))

//汉字 4e00-9fa5 查看unicode
console.log('\u4e00\u9fb3', 'abc'.indexOf('b'))
console.log(typeof (true), typeof (null), typeof (undefined))
console.log(typeof (typeof (true)))

//数字 + 字符串-》 字符串
console.log(10 + 'kb', typeof (10 + 'kb'))
//数字 + bool -〉数字
console.log(10 + true, typeof (10 + true))

// bool -> 'true' 'false'
console.log(true + 'aaa', typeof (true + 'aaa'))

// bool bool -> number
let c = true + false
console.log(c, typeof (c))

var num1 = 3, num2 = 'st', num3 = true
console.log(num1 + num2 + num3)
console.log(num2 + num3 + num1)
console.log(num3 + num2 + num1)
console.log(num1 + num3 + num2)

var num4 = parseInt('20f')
console.log(num4, typeof (num4))
num4 = parseInt('f20f')
console.log(num4 + 'aa', typeof (num4))

num4 = parseFloat('20.32f')
console.log(num4 + 'aa', typeof (num4))

num4 = Number('20f')
console.log(num4 + 'zz', typeof (num4))

num4 = Number('20')
console.log(num4 + 'zz', typeof (num4))

console.log(NaN + 1)
// alert prompt 在客户端运行的函数
//alert('aaabbb')
//console.log(prompt('aaa', 'bbb'))

// +-*/% ++ -- 同c/c++
num4 = 5
console.log(num4++)
console.log(++num4)

var a = 1
console.log('test plus plus ', a++ + ++a)

// == === == 存在隐式类型转换 ，=== 必须类型和值都相当才为真
console.log(21 == '21', 21 === '21')
// 比较时，如果一方为数值，隐式转换为数值
console.log('3' > 10, '3' > '10')
// 转换时使用Number进行转换 nan和任何值比较，结果都是false
console.log('3m' > 10, '3m' < 10, '3m' == 10, NaN == NaN)

//  && || ! 同 c/c++
console.log(!5, !5 < 4, !(5 < 4))

// & | ^ >> <<
console.log(3 >> 1, 1 >> 1)

// 条件表达式?  表达式1: 表达式2
// if 
if (undefined || null || NaN || 0 || '' || 0.0) {
    console.log('if runing............')
}

// switch 同c/c++ 判断使用的 === 
var num5 = 10
switch (num5) {
    case '10':
        console.log('1 num is 10')
        break;
    case 10:
        console.log('2 num is 10')
        break;
    default:
        console.log('switch sble')
        break;
}



// while do...while for 同c

/* var
使用var语句多次声明一个变量不仅是合法的,而且也不会造成任何错误.
如果重复使用的一个声明有一个初始值,那么它担当的不过是一个赋值语句的角色.
如果重复使用的一个声明没有一个初始值,那么它不会对原来存在的变量有任何的影响.
*/
var index = 1
//let index = 2
for (var index = 0; index < 3; index++) {
    {
        index = 100
    }
}
console.log('after for ', index)

// 函数参数的作用域，属于局部变量
// 全局的变量，函数内可以访问，但是
// 当整个函数内部有定义的变量和全局变量重名的时候，访问到的是函数内部的变量
// 因为：js 程序在执行前，声明的变量都回加载到程序的最前面，只是提升声明，
// 但是赋值还是在原来的位置，函数内部也存在变量提升

var num6 = 100, num7 = 11;
fn()
var fn2
function fn() {
    //变量提升 num6 是undefined
    console.log('sble', num6, num7)

    //获取当前的函数
    fn2 = arguments.callee

    //函数内的变量声明时，如果没有var，他就是一个全局的变量
    num8 = 12

    // var 和 let 都定义了局部num8，全局无法访问
    //var num8 = 12 
    //let num8 = 12
    var num6 = 200;
    console.log(num6)
    return 200 // return 是返回值，不需要在函数头进行声明
}
console.log(num6)
console.log(num8)
//函数也有作用域，在函数内部声明的函数，只能在函数内部访问
//函数调用时，参数不够的话，后续的参数值为undefined
//参数多了的话，并不影响，多余的自动截去

fn2()

//fn3() //调用异常 匿名函数 赋值给变量，
//不会进行函数名提升只有变量提升
var fn3 = function () {
    console.log('fn3', arguments.callee)
    return 'ok fn3'
}
fn3()

// 匿名函数可以用作回调函数
function fn4(func) {
    func(123)
}
fn4(function (n) {
    console.log('aaa', n)
}); //这里没有分号，竟然会解释不过

(function (n) {
    //创建局部作用域 不会造成变量名污染
    console.log('call niming', n)
})(32);

(function fn5(n) {
    console.log('call func', n)
})(100);


var uri = encodeURI('http://www.codeboy.com/?kw=戴尔')
console.log(uri)
console.log(decodeURI(uri))

console.log('nan isnan ', isNaN(NaN), '0 isnan ', isNaN(0))

console.log(isFinite(1/3), isFinite(1/0))
console.log(1/0) // Infinity
console.log(eval('5+10+12'), eval('fn3()'))

// 对象是一组属性和方法的集合
// 对象直接量 属性名，属性值，这不就是字典嘛
var abc = 
    {
        color: 'red', 'my age':12
    }
console.log(abc, abc.color, abc["my age"], abc.hhh)

// 添加修改属性,还是字典
abc.hhh = 23
abc.color = 'blue'
abc['h hh'] = 24
console.log(abc, abc.color, abc["my age"], abc.hhh)

//内置构造函数创建对象
var ob1 = new Object()
ob1.color = 123
console.log(ob1)

function createObj(name, color){
    var o = new Object()
    o.name = name
    o.color = color
    return o
}
var ob2 = createObj('aaa', 123)
var ob3 = createObj('aaa', 'zzz123')
console.log(ob2, ob3)
ob3.onefunc = function(n){
    console.log('ob3 function', n, this.name, this.color)
}
ob3.onefunc(12)

for(let key in ob3){
    console.log(key, ob3[key])
}

// 是否含有成员
console.log(ob3.hasOwnProperty('color'), 'name' in ob3)

//undefined -> false  null -> false 等号的隐式转换
if(undefined == null){
    console.log('sble')
}

if(undefined === null){
    console.log('sble2222')
}

// 基础对象是值拷贝,js中字符串不可被更改
var n = 2
function fn5(n){
    n = 3
    console.log(n)
}
fn5(n)
console.log(n)

// 字典和对象是 引用传递
var ob4 = {name : 'tom'}
function fn6(obj){
    obj.name = 'zz'
}
fn6(ob4)
console.log(ob4)


// 数组, 元素类型不固定
var arr1 = ['tom', 'jerry', 12, true]
for (let index = 0; index < arr1.length; index++) {
    const element = arr1[index];
    console.log(element)
}

for(let index in arr1){
    console.log(arr1[index])
}

arr1.forEach(function(val, index, arr){
    arr[index] = 0
    console.log('foreach', val, index, arr)
})

// 会自动扩展
var arr2 = new Array(2);
arr2[0] = 1
arr2[5] = 3
console.log(arr2, arr2[1], arr2.length)

//undefined
// 声明了变量，为赋值 
// 实参数量小于形参的数量
// 访问对象中不存在的属性
// 创建数组，未初始化数据时

// 关联数组 索引和字符串都可以使用,只能用for in来遍历 
var arr3 = []
arr3['name'] = 'tom'
arr3['age'] = 18
arr3[2] = 18

for(let index in arr3){
    console.log(index, arr3[index])
}
console.log(arr3)

// 可变参数
function fn7(){
    console.log(typeof(arguments), arguments)
    var sum = 0
    for(var key in arguments){
        console.log(key, arguments[key])
        sum += arguments[key]
    }
    return sum
}
console.log(fn7(1,3,3,4), typeof(arr2), typeof({}))

// 删除数组元素
console.log(arr2)
console.log(arr2.splice(0,5, 'aaa', 'bbb'))
console.log(arr2)
arr2.reverse() // 就地修改，翻转元素
console.log(arr2)


arr2 = [1,3,5,3,2,33,22,99,88]
arr2.sort() // 默认是字符序列
console.log(arr2)
arr2.sort(function(a, b){return a-b})
console.log(arr2)

arr2.push(123)
console.log(arr2)
arr2.pop()
console.log(arr2)

arr2.unshift(123)
console.log(arr2)
arr2.shift()
console.log(arr2)

arr2.splice(2,0, 'aa')
console.log(arr2)

// 字符串 是不可修改的
var str1 = 'aaa'
var str2 = new String('bbb')
var str3 = String('ccc')
console.log(str1, str2, str3)
console.log(typeof(str1), typeof(str2), typeof(str3))

// 非就地修改
str1 = str1.toUpperCase()
console.log(str1)
str2 = str2.toUpperCase()
console.log(str2, typeof(str2))
str3 = 'abca我喜欢'
console.log(str3.length, str3.charAt(3))

for(let inx in str3){
    console.log(inx, str3[inx], str3.charAt(inx))
}
console.log(str3.indexOf('z'), str3.indexOf('我', 2))

console.log(str3.replace(/a/g, 'zz'))
console.log(str3.replace(/A/gi, 'zz'))
console.log(str3)

console.log(str3.match(/A/ig))
console.log(str3.search(/A/i))

// Math 对象 直接使用
console.log(Math.max(2, 2,3), Math.PI)
console.log(Math.ceil(4.01), Math.floor(4.99), Math.round(3.5))
console.log(Math.random())

// date  utc时间 北京时间比它大8个小时 当前时间，转成utc时间
var date1 = new Date()
console.log(date1)

// 2018:11:20 0:0:0 北京时间 get获取的也是本地的时间
var date2 = new Date(2018, 11, 20)
console.log(date2, date2.getHours(), date2.getDate())
console.log(date2.toLocaleString())
console.log(date2.toLocaleDateString())
console.log(date2.toLocaleTimeString(), date2.getTimezoneOffset())

var date3 = new Date('2018-11-20 0:0:0')
console.log(date3)

// 距离utc 元年的时间，单位毫秒
var date4 = new Date(50*1000)
console.log(date4, date4.getTime())


// Number 对象
var number1 = new Number(100)
var number2 = new Number('101')
console.log(typeof(number1), number1, typeof(100))

console.log(typeof(number1+number2), number1+number2)

var number3 = new Number('105a')
console.log(number3, Number.MAX_VALUE)

var bool1 = new Boolean(undefined)
console.log(bool1, typeof(bool1), typeof(true))

try {
    var arr4 = new Array(-1)
} catch (err) {
    console.log(typeof(err), err.name)
    console.log(Object.prototype.toString.apply(err))
    var arr4 = new Array(2)
}
console.log(arr4)

// {}之间声明let，都是局部的
{
    let mama = 1
    var mama2 = 1    
}
console.log(mama2)//mama 无法访问

// 箭头函数
var arr5 = [1,5,3,6,0,8]
arr5.sort((a, b) => {
    return a-b
})
console.log(arr5)

arr5.sort((a, b) => b-a)
console.log(arr5)

// 模板字符串
var str4 = `aaa: ${str1}, \nbb: ${str2}`
console.log(str4)

function fn8(a, b, c=1){
    return a+b+c
}
console.log(fn8(2, 3))


