/**
 * Created by 39753 on 2017/4/10.
 */
// 原型继承
// 继承的核心就是让不同的构造函数之间的原型链有了联接
function  object (o) {
    function  Fn () {
        this.x = 'x';
    }
    Fn.prototype = o;
    return new Fn();
}
var obj = {
    name: 'zhaoxuan',
    age: function () {
        console.log(1);
    }
};
var obj2 = object(obj);
obj2.age();
console.dir(obj2);


function A () {
    this.nameX = function () {
        console.log('zx');
    }
}
function B (){

}
B.prototype = new A();
var a = new B();
console.dir(a);
// call 继承  把父类设置私有的属性，克隆一份作为子类私有的
    function  C () {
        this.x = 100;
        console.log(this)
    }
C.prototype.b = 'x';

function D () {
        C.call(this)
}
var o = new D();

console.log(o.x);
console.log(o.b);
new C();

// 冒充对象继承  子类继承了父类私有的和公有的属性和方法
   function A () {
       this.x = 100;
   }
A.prototype.getX = function () {
    console.log(this.x);
};
   function  B (){
       var temp = new A();
       for (var key in temp) {
           this[key] = temp[key];
       }
   }
var b = new B();
console.log(b.x);