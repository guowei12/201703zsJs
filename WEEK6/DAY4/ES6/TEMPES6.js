for (let i = 0; i < 5; i++) {
    window.setTimeout(function () {
        console.log(i);
    }, 0);
}

let a = 12;

var b = 13;

// function fn(a, b) {
//     return a + b;
// }
// console.log(fn(100, 200));

let fn = (a, b)=>a + b;
console.log(fn(100, 200));