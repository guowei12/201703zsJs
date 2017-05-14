/**
 * Created by Weil on 16/3/23.
 */
'use strict';

// resolve 和 reject 类似于rerun的功能

var promise1 = new Promise((resolve, reject) => {
  resolve();
});

var promise2 = new Promise((resolve, reject) => {
  reject();
});


promise1.then(() => {
  console.log('then1');
}, () => {
  console.log('then1-2');
}).catch(() => {
  console.log('catch1');
});

promise2.then((...a) => {
  console.log('then2');
}).catch(() => {
  console.log('catch2');
});

console.log('---');
promise1.then(() => {
  console.log('1');
  promise2.then(() => {
    console.log('2');
  })
}).catch(() => {
  console.log('c');
});

//let p = new Promise(() => {
//  promise1.then(() => {
//    console.log('1');
//    promise2.then(() => {
//      console.log('2');
//    })
//  });
//});
//p.catch((err) => {
//  console.log(err);
//});