console.log('module init')

function sum(a, b){
    return a+b
}

function mul(a, b){
    return a*b
}

/*
CommonJS规范规定，每个模块内部，module变量代表当前模块。
这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。
加载某个模块，其实是加载该模块的module.exports属性。
为了方便，Node为每个模块提供一个exports变量，指向module.exports
exports = module.exports
*/ 
module.exports = {
    sum:sum,
    mul
}

/*exports.sum = sum
exports.mul = mul*/
console.log(exports)

//需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系
//nodejs 不适用
