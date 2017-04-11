/**
 * Created by 39753 on 2017/4/11.
 */
// 构造函数模式
// 类:  物语类聚，人与群分。 具有相同属性和方法的实例的一个集合总称。
// JavaScript内置类：Number String Boolean Null Undefined
//             Object Function Date Math  RegExp  Array

// 通过构造函数的形式，创建了一个Number这个类的一个实例 1；
//    // 构造函数创建实例的方式，通过本身的运算。返回一个引用实例。
//    var num = new Number('1');
//    var num2 = new Number(1);
//    console.log(num);
//    console.log(num2);
//    // Array
//    var array = [1, 2, 3, 4];
//    // 数组属于js中Array这一类，所有的通过构造函数的形式创建实例，new 类名();
//    var ary = new  Array(4,5,6,7);
//    console.log(ary);
//    // 自定义类 ， 自定定义构造函数;  自定义构造函数的名字，首字母必须大写(规范)；
    function Myclass () {
        this.name = '3班';
        this.talk = function () {
            alert(this.name)
        }
    }
//    // 数组方法
//    var ary = [1,2];
//    var newary = [3,4];
//    ary.slice(0,1);
//    newary.slice(0,1);
//var newCla = new Myclass();
//    // 类，具有相同属性方法实例集合总称
//    var newClaTwo = new Myclass();
//    newClaTwo.talk();
//    newCla.talk();
//
//console.log(newCla == newClaTwo);

// 所有的new 或者 字面量形式创建的对象，都会继承他们所属类的私有和公有的方法，那这种功能是怎么来的呢？这就引出了JavaScript中的原型链知识

// __proto__  原型，所有引用数据类型，都存在这个不可枚举的属性。
// constructor 构造函数。 存在于所有构造函数的原型（prototype）上。保存的值是当前所属类本身
// protoType 原型规范 (保存的是函数公有的方法)，所有的函数和构造函数；
    // 这三部分就构成了原型链

var obj  = {
    name:'zx'
};
var obj1 = new Object();

 function A () {
     this.age = function () {
         console.log('my age is 18');
     };
     this.fav = function () {
         console.log(' i like coding');
     }
     console.log(this)
 }
 var a = new  A();


a.age = function () {

};
a.fav =  function () {

};
a.fav();
a.age();