/**
 * Created by Weil on 16/3/24.
 */

'use strict';

// 有点像一个函数内部有多个函数,是一个状态机.
// Generator 生成器
// yield 生成

// 三种状态 hello js end
function* func() {
  yield 'hello';
  yield 'js';
  return 'end';
}

// Generator 返回的不是返回值,也不是第一个生成的内容,而是一个迭代器
let funcGen = func();
//
//for (let item of funcGen) {
//  console.log(item);
//}
//console.log('---');
//
console.log(funcGen);
console.log(funcGen.next());
console.log(funcGen.next());
console.log(funcGen.next());
console.log(funcGen.next());
console.log(funcGen.next());
console.log(funcGen);


