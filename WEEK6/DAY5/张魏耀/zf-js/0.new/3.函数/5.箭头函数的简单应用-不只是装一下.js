
let arr = [1, 3, 5, 7];

let arrMapRes = arr.map(function (item, index, arr) {
  return item + 1;
});


let f = function (param) {
  return param + 1;
};

let arrArrowRes = arr.map(item => f(item));

console.log(arrArrowRes);