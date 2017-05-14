/*
 * ES6中的迭代器：for of
 */
// let ary = [12, 23, 34, 45];
// for (let value of ary) {
//     console.log(value);//->每一项的值
// }

// function fn() {
//     for (let value of arguments) {
//         console.log(value);//->每一项的值
//     }
// }
// fn(12, 23, 34, 45, 56);

// let obj = {
//     a: 1,
//     b: 2,
//     c: 3
// };
// for (let value of obj) {
//     console.log(value);//->Uncaught TypeError: obj[Symbol.iterator] is not a function
// }

let ary = [[12, 23], [34, 45]];
for (let [a,b] of ary) {
    console.log(a, b);
}
