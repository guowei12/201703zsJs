/**
 * Created by Weil on 16/3/27.
 */

let set = new Set([1, 3, 1, 3, 4, 6]);

set.add('9');
let res = set.delete(9);

let keys = set.keys();

//console.log(set, res, keys);

// 数组去重

let arr = [1, 2, '2', '2', '3',
          2, 3, 4, 5, 1];

// 第一步 把数组变成Set
let setFromArr = new Set(arr);

// 第二步 Set自动就会去重

// 第三步 把Set变成数组

//console.log(setFromArr, Array.from(setFromArr));
let uniArr = Array.from(new Set(arr));
console.log(uniArr);
















