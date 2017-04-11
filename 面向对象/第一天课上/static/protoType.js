/**
 * Created by 39753 on 2017/4/11.
 */
// 原型链  prototype
// __proto__  指向所属类的原型
// protoType  存当前类的公有方法
// constructor 指向当前类
var ary  = [1,2];
console.dir(ary);
// 所有的构造函数 和 类都属于Object 这个大类
Array.prototype.sum = function () { // protoType存的是公有属性和方法。 他是一个对象数据类型的引用地址
    var num = 0;
    for (var i = 0; i < this.length; i++) {
        num += this[i];
    }
    return num;
};
// 在什么情况下会去查找，protoType原型上的,当前是实例私有的属性不存在sum，这个属性的时候，他会网他的当前所属类的原型上去找公有的sum。

// 原型链查找练习
var arySum = new Array(5,2,3);
arySum.sum = function () {
    return 1;
};
//console.log(arySum.sum);
//console.log(Array.prototype.sum);
//console.log(Array.prototype.sum == arySum.__proto__.sum);



// 原型链模式 ---- 定义公有方法
// 数组求和

// 1、找出他当前所属类
// 2、在当前类的公有原型prototype定义公有方法
// 3、子类直接调用   ---- 构造函数中this  当前创建的实例



// 数组弹出本身
    Array.prototype.ale = function () {
       alert(this)
    };
    var ary = ['wo','shi','shui'];
    ary.ale();

ary.__proto__ // protoType
ary.__proto__.protoType // protoType.protoType