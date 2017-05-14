/**
 * Created by Weil on 16/3/26.
 */
'use strict';

// ...

let obj = {
  a: 'a',
  b: 'b',
  c: [1, {o: 'o'}]
};

//let a = obj.a;
//let b = obj.b;
//let c = obj.c;

let {a, b, c} = obj;

console.log(a, b);


