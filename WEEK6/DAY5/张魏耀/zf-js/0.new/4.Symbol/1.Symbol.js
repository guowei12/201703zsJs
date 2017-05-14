/**
 * Created by Weil on 16/3/27.
 */

let syb = Symbol('s');
let syb2 = Symbol('s');


let obj = {
  [syb]: 123
};

console.log(syb === syb2, syb.toString(), syb2.toString())

console.log(obj);