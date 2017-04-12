/**
 * Created by zhaoxuan on 2017/4/11.
 */
function Fn () {
    this.x = 120
}
Fn.prototype.getX = function () {
    console.log(this.x);
};
var fn = new Fn();
// 检测当前实例所属类 instanceof
//
//console.log(fn instanceof Object);
//console.log(fn instanceof Fn);
//console.log(Fn instanceof Function);
//console.log(Fn instanceof Object);



// 函数本身也有一些自己的属性
    /*
    *  length  形参个数
    *   name   函数名
    *   prototype 保存的是类的原型
    *   __proto__ 指向类的原型  也就是指针指向 prototype
    */



// 函数的三面性
    // 1、普通函数方法  函数执行时候开辟栈内存作用域，形成闭包，进行预解释
    // 2、类            他可以创建自己的实例，也可以在prototype属性上保存自己的属性和方法
    // 3、普通对象       想object一样，拥有引用空间堆内存，也有__proto__找到自己所属类原型
    var obj = {name:'1'};
    function  sum (n,y) {}
    //console.dir(obj);
    //console.dir(sum);
    //console.log(obj.__proto__ == sum.__proto__.__proto__);
    //// 当前对象原型链上存在的方法他都可以调用
    //console.log(obj.toString());
    //console.log(sum.toString());
console.log(sum.length,sum.name);