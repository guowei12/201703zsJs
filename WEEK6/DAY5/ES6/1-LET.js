/*
 * ES6中定义变量使用 LET/CONST
 *  =>LET
 *   1)使用LET定义的变量不能进行“变量提声”
 *   2)同一个作用域中,LET不能重复定义相同的变量名
 *   3)使用VAR在全局作用域中定义的变量相当于给WINDOW增加了一个私有的属性，但是使用LET定义的变量和WINDOW没有任何的关系
 *
 *  =>CONST
 *   1)除了拥有LET的那些特点之外，CONST定义的变量是一个恒定的值(常量)，存储的值是不能进行改变的
 */
// //console.log(a);//->Uncaught ReferenceError: a is not defined
// let a = 12;
// //let a = 13;//->Uncaught SyntaxError: Identifier 'a' has already been declared
// a = 13;
// console.log(a);
// console.log(window.a);//->undefined

// const a = 12;
// a = 13;//->Uncaught TypeError: Assignment to constant variable.
// console.log(a);






