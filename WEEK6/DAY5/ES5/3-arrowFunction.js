"use strict";

/*
 * ES6中提供了定义函数的新操作方式：“箭头函数”
 *   =>相对于传统的函数来说，我们可以快速的给形参变量设置默认值
 *   =>箭头函数中的THIS继承父级作用域中的THIS
 *   =>箭头函数中没有arguments
 *
 * 真实项目中我们的函数应该是箭头函数和普通函数混合开发使用
 */

//========================================
// (()=> {
//     console.log(1 + 1);
// })();
// (function () {
//     console.log(1 + 1);
// })();

// let fn = ()=> {
//     console.log(1 + 1);
// };
// var fn = function fn() {
//     console.log(1 + 1);
// };

// let fn = (a, b)=> {
//     console.log(a + b);
// };

// let fn = (a, b)=> a + b;
// var fn = function fn(a, b) {
//     return a + b;
// };

// let fn = a=>a;
// var fn = function fn(a) {
//     return a;
// };


//========================================
// let fn = function (a, b) {
//     if (typeof a === 'undefined') {
//         a = 0;
//     }
//     b = b || 0;
//     return a + b;
// };
// console.log(fn(10, 20));//->30
// console.log(fn(10));//->(NaN) 10

// let fn = (a = 0, b = 0) => a + b;
// console.log(fn(10, 20));//->30
// console.log(fn(10));//->10

// let fn = (a = 0, b = 0) => a + b;
// let sum = function (callBack) {
//     console.log(callBack(10, 20));
// };
// sum(fn);

//========================================
// var num = 120;
// var obj = {
//     num: 12,
//     fn: function () {
//         console.log(this);//->obj
//
//         window.setTimeout(()=> {
//             console.log(this.num);//->this:obj 12
//         }, 1000);
//
//         // var _this = this;
//         // window.setTimeout(function () {
//         //     //console.log(this);//->window
//         //     //console.log(this.num);//->120
//         //     console.log(_this.num);//->12
//         // }, 1000);
//
//         // window.setTimeout(function () {
//         //     console.log(this.num);//->12
//         // }.bind(this), 1000);
//     },
//     init(){
//         console.log(this);//->obj：这种写法和上面FN属性这个写法是一模一样的
//     }
// };
// //obj.init();
// obj.fn();


var utils = function () {
    return {
        // init: function () {
        //     console.log(this);//->utils
        // }
        init: function init() {
            console.log(undefined); //->window
        }
    };
}();
utils.init();