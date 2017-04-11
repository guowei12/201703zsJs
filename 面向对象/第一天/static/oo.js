/**
 * Created by zhaoXuan on 2017/4/10.
 */
//// 面向对象: Object Oriented,OO
//// 工厂模式 其实就是一封装函数 ： 作用提高代码的低耦合高内聚
////function  per (name,age){
////    return 'my name is'+ name + ',age is' + age
////}
//function  Per (name,age){
//    var person = {};
//    person.name = name;
//    person.age = age;
//    person.introduce = function () {
//       alert('my name is'+ name + ',age is' + age)
//    };
//}
//var per = new Per();
//console.log(per instanceof Per);
//
//// 构造函数模式  学构造函数 先学习JS中的 类。 什么是类呢。具有相同属性和方法的集合总称。
////比如 数组 就是一个类。
//
//// 1、类：无论是物以类聚，还是有一类人，这里说的类并不是实际存在的事物，是一些特征、是一些规则等
//// js中都有哪些类： 1、Number String Boolean Null Undefined
//                       // Array Object RegExp  Date Function
//
//// HTMLCollection  元素集合类  通过bytagname获取的节点都是他的实例
//// NodeList  节点集合类   通过byname获取的节点都是他的实例
//// HTMLDivElement 每个标签对应自己一个类
//// 所有的类都属于Object 这个大类
//
//// 构造函数的使用和自定义构造函数的创建
////    var ary = [1,2,3]; // 字面量方法
////    var aryNew = new Array(1,2,3); // 构造函数方法 ， 两种方法创建的函数都属于数组类，都是数组的一个实例
////    console.log(aryNew);
//// 自定义构造函数
//  // 首字母大写
//
//// 和普通函数相比相同点：构造函数也有普通函数的一面， 也要进行形成私有作用域（栈内存），进行预解释，然后代码从上往下开始解析执行。也可以当成普通函数执行
//
////  不同： 浏览器会默认创建一个对象，引用数据类型的值，不需要我们手动创建了。然后把对象返回。
//
//
//
//// 1、构造函数中的this 指向当前创建的实例(window的情况)
//// 2、所有的实例都是引用数据类型。
//// 3、所有当前类的实例都拥有，当前类的所有方法。 但是不同实例间的方法是不一样的。在实例中自定义的属性都是当前实例私有的属性
//
//
//
//// 注意：1、构造函数当普通函数执行的时候 前边 没有new  就是一个普通函数
//        // 2、  在构造函数中如果写return 返回的是引用数据类型的 ， 会改变构造数据类型的返回。不再是返回实例的引用地址。而是新的引用地址，新的对象
//// 3、 in  私有和共有的 都能检测   hasOwnProperty 检测属性是否为私有属性
//
//
//// 检测是公有属性 。
//  function hasPubProperty (obj, attr) {
//
//      return attr in obj && !obj.hasOwnProperty(attr);
//  }
//function Fun(){
//
//}
//Fun.name = function (name) {
//    this.name = name;
//};
//var neFn = new Fun();
//console.log(neFn.name);
//Fun.prototype.name = function () {
//        this.name = 'zhaoxuan'
//    };
//var obj = new Fun();
//console.log(Fun instanceof Function);
//console.dir(Fun.__proto__);
//
//// 原型模式
//// 构造函数模式 和 原型模式 都基于原型链
//// 理解原型链 先记住 三个名词 constructor  prototype  __proto__
//
//
//
//// 我们在查找属性的时候如果私有的有 就不去找公有的
//
//var obj  = {name: 'name'};
//
//console.log(obj.__proto__);
// 链式写法  一个写完紧挨着执行下一个方法

// 在原型上增加方法



//  改变原型的方法


// 继承
function Fn (name) {
    this.name = name;
}
var obj = new Fn('zx');
Fn.prototype.num = '1';
for (var key in obj) {
    console.log(key)
}
console.log(obj.num);
console.log(obj.propertyIsEnumerable('num'));



// var obj3 = Object.create(obj) 创建一个新对象，把obj作为obj3的原型 不兼容ie
function sum () {
    var num = 0;
    for (var i = 0; i<this.length; i++){
        num += this[i]
    }
}

Array.prototype.sum = function () {
    var num = 0;
    this.forEach(function (item, i) {
        num += item
    });
    return num;
};
var ary = [1, 2, 3,4,5,6,7,8,9];
console.log(ary.sum());


//  继承 很简单   就是A的构造函数的原型 等于 B构造函数的实例。就可以了。