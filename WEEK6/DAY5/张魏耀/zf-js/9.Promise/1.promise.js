/**
 * Created by Weil on 16/3/23.
 */

'use strict';
let p = new Promise((resolve, reject) => {
  //setTimeout(() => {
  //  console.log(123);
  //}, 1000);
  resolve(123);
});

// promise的唯一性,不受外界改变,并且任何时候都不会变

setTimeout(() => {
  p.then((param) => {
    console.log(param);
  }).catch((param) => {
    console.log(param);
  })
}, 1000);

setTimeout(() => {
  p.then((param) => {
    console.log(param);
  }).catch((param) => {
    console.log(param);
  })
}, 2000);


