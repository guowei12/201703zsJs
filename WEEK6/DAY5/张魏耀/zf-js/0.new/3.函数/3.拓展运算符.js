/**
 * Created by Weil on 16/3/26.
 */
// 迭代
let arr = [1, 4, 7, 123, 888, 2, 2];

//for (let i = 0, len = arr.length; i < len; i++) {
//  return arr[i];
//}

//let max = Math.max.apply(null, arr);
let max = Math.max(...arr);

//Math.max(1, 3, 4);

console.log(max);

let arr1 = [1, 3];
let arr2 = [4, 6];

//let arr3 = arr1.concat(arr2);
let arr3 = [...arr1, ...arr2];
console.log(arr3);

