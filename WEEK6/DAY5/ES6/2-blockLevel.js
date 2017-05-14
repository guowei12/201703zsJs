/*
 * ES5中的作用域只有两种
 *   ->全局作用域
 *   ->函数执行形成的私有作用域
 *
 * ES6中的作用域多加了一种
 *   ->块级作用域：基本上凡是被“{ <js code> }”包起来的都是块级作用域，块级作用域和之前学习的私有作用域一样，保护里面的私有变量不受外界的干扰；而且作用域链机制和之前相同；
 */

// let b = 13;
// if (1 == 1) {
//     let a = 12;
//     console.log(a);//->12
//     console.log(b);//->13
// }
// console.log(a);//->Uncaught ReferenceError: a is not defined

// for (let i = 0; i < 5; i++) {
//     //->每循环一次都会形成一个块级私有的作用域，而i是每一个私有作用域中的私有变量，例如：当前循环创建了五个私有的块级作用域，第一个块级作用域中存在一个私有的变量i=0，第二个私有块级作用域中的私有变量i=1...
//     window.setTimeout(function () {
//         console.log(i);
//     }, 0);
// }
// console.log(i);//->Uncaught ReferenceError: i is not defined








