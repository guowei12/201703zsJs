///**
// * Created by 39753 on 2017/4/11.
// */
//// 原型链查找练习
////var arySum = new Array(5,2,3);
////arySum.sum = function () {
////    return 1;
////};
////console.log(arySum.sum);
////console.log(Array.prototype.sum);
////console.log(Array.prototype.sum == arySum.__proto__.sum);
//
//    function  A (age) { // 我在实例化的时候,给实例创建私有属性， 直接用this.属性名即可。
//    // 想一想this的知识点
//        this.sum = function () {
//            var num = 0;
//            for  (var i = 0; i<arguments.length; i ++) {
//                num+=arguments[i]
//            }
//            return num;
//        };
//        this.age = age;
//    }
//    var a = new A(18);
//    var b = new A(22);
//    console.log(a);
//    console.log(a.age);
//    console.log(b.age);
//    console.log(a.age == b.age);
//    console.log(a == b );
//
////A.prototype.sam = function () {
////    return '找到了'
////};
////console.log(a.sum(1, 2, 3, 4, 5, 6, 7));
////console.dir(a);
////
////// 查找对象属性的方法。 for in   hasOwnProperty
////// for in  和hasOwnProperty区别
////// for in 将私有和原型公有的可枚举都遍历出来
////for (var key in a) {
////    console.log(key)
////}
////// hasOwnProperty  检测是否为存在私有属性，原型上的是公有的所以检测不到是私有的返回fasle
////console.log(a.hasOwnProperty('sum'));
////console.log(a.hasOwnProperty('sam'));



//var obj = {};
//var fn = function () {};
//console.dir(obj);
//console.dir(fn);