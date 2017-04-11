/**
 * Created by 39753 on 2017/4/11.
 */
    //function Sum (n,y) {
    //    this.num = n;
    //    this.year = y;
    //}
    //Sum.prototype.ale = function () {
    //    alert(this.num)
    //};
    //var s = new Sum(88);
    ////s.ale();
    //s.__proto__ =  {
    //    constructor: Sum
    //};
    //console.dir(s);
    //Array.prototype.sum = function () {} 浏览器禁止修改内置类
    //Array.prototype = {
    //    // protoType 是一个引用地址。
    //
    //};
    //console.dir(Array);


// 继承
// 原型继承: 有两个类 第一个A类   第二个B类 A,想拥有B中的方法，这时候就会使用原型继承。使他们原型之间存在了联系。
// 让A的原型  =  B一个实例,手动添加constructor 。
//function  A () {
//    this.age = 13;
//}
//function  B (age) {
//    this.age = age;
//    this.ale = function () {
//        alert(this.age);
//    };
//}
//B.prototype.col = function () {
//    alert(this.age)
//};
//A.prototype = new B(66);
//A.prototype.constructor = A;
//var a  = new A();
//console.dir(a.col());
//
//// call继承 --- 改变调用对象this的指向
//// call继承  把父类（A）设置私有的属性，克隆一份作为子类(B)私有的
//
////function A () {  设置私有属性，直接在构造函数中使用this即可
////    this.age = 18;
////    this.sy = function () {
////        alert(this.age)
////    }
////}
////var a = new A();
//
//
//function  A () {
//    this.x = 100;
//    this.name = function () {
//        return 18;
//    }
//}
//A.prototype.b = 'x';
//
//function D () {
//    // 构造函数中的this是D的实例
//    this.name = 'zx';
//    A.call(this);// 通过改变call方法改变A中this的指向，然后让D拥有A的私有的属性和方法。
//
//}
//var o = new D();
//console.log(o);

    // 冒充对象继承  子类继承了父类私有的和公有的可枚举的属性和方法
    // 遍历私有和共有的属性和方法 for in
    // A 的实例，直接就继承了A的公有和私有方法
function A () {
    this.x = 100;
}
A.prototype.getX = function () {
    console.log(this.x);
};
var a = new A();
for (var key in a) {
    console.log(key);
    console.log(a[key]);
}

function  B (){
    // B的实例b
    this.myname = 'haha';
    var temp = new A();
    for (var key in temp) { // A的公有和私有的都遍历出来, 添加到B的私有的上边
        this[key] = temp[key];
    }
}
B.prototype.name = 'zhe才是';
B.prototype.ale = function () {
    alert(this.name)
};
var b = new B();
console.log(b.ale());
 // A  B  让B继承A 私有公有；


