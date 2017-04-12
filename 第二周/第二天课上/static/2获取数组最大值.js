/**
 * Created by 39753 on 2017/4/11.
 */

//call()和apply() 作用:改变this的指向
// 传参数: 第一个参数改变调用对象中this指向,第一参数是谁,this就指向谁
// 后边的参数: 是对应调用对象,传的实参 call是一个个传进去的 apply 以数组的形式穿进去的
// call和apply执行: 先让调用对象执行,然后再改变this,并且传值进去
//function myName (my, age) {
//    this.name = my;
//    this.age =  age;
//    console.log('my name is' + my + 'my age is'+ age);
//    console.log(this)
//}
//
//var obj = {
//    name: '张盛尧',
//    age: 12
//};
//
//myName.call(obj,'刘晨',18);
//
//console.log(obj);
//
//myName.apply(obj,['赵老师','还年轻']);
//
//
////求数组最大值
//
//var num = [1,3,45,234,643,43];
//console.log(Math.max(1, 2, 3, 4, 45, 6));
//console.log(Math.max(num));
////谁要用Math.max方法,是num要用
//// apply改变this指向之前,会让他前面调用函数执行,并把参数参进去
//console.log(Math.max.apply(null, num));// 改不改变this现在是不重要,重要的是什么,让Math.max执行,
//// 并把实参,以数组的形式传进去,apply能完成将实参以数组的形式依次传进去.获得返回结果.
//
//// call apply  bind也是改变调用对象的this指向,但是改变的时候,没有让调用对象执行.只是bind函数执行完,改变完调用对象的this后,将改变this后的调用对象方法,返回.
//// 传一个参数,this的指向
//    var num  = myName.bind(obj); // 在改变this指向的时候,把实参传进去,就相当于把实参写死,以后再写就没有意义
//    num('耐克','阿迪');

//function  fn () {
//    console.log(this);
//}
////fn.call();
////fn.call(null);
////fn.call(undefined); //这里的this都是window
//
//
//fn.call(); // this undefined 不传就是undefined
//fn.call(null);// null  传null就是null
//fn.call(undefined);//这里的this都是undefined  传undefined
//"use strict";
//
//var newfn = fn.bind(obj);//只是改变fn的this，但是fn不执行。bind()是一个方法，返回值就是改变this后的函数
////newfn('pingguo');
//
//// 非严格模式下，没有函数没有调用对象，函数的this就是window，严格模式下的函数没有调用对象，this就指向undefined


// eval（） 函数 ， 将字符串转化成js表达式

//eval('var a = "这是运行了的"');
// console.log(eval('1+2+3+4'));


//
//function fn1 () {
//    console.log(this)
//}
//function  fn2 () {
//    console.log(this)
//}
//var obj = {
//    fn:fn2
//};
//(fn1,fn2,obj.fn)();
//// 相当于自执行函数，但是执行的只是最后一个函数，这个函数中的this变成了window






//// 求一组数的最大值
var ary = [1,2,3,54,56];
console.log(Math.max(1,2,3,4,5,6,7));
console.log(Math.max.apply(ary, ary));
console.log(Math.min.apply(ary, ary));
console.log(Math.max.apply(null, ary));
console.log(Math.min.apply(null, ary));

console.log(Math.max.apply(ary,ary));