"use strict";

var _loop = function _loop(i) {
    window.setTimeout(function () {
        console.log(i);
    }, 0);
};

for (var i = 0; i < 5; i++) {
    _loop(i);
}

var a = 12;

var b = 13;

// function fn(a, b) {
//     return a + b;
// }
// console.log(fn(100, 200));

var fn = function fn(a, b) {
    return a + b;
};
console.log(fn(100, 200));