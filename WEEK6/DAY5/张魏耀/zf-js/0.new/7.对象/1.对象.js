/**
 * Created by Weil on 16/3/27.
 */

let a = 'a';
let b = 'b';
let param = 'pppp';

let obj = {
  func: function () {

  },
};

let obj2 = {
  func () {

  },
  [param]: 123
};


function func (x, y) {
  let xone = x + 1;
  let yone = y + 1;
  return {xone, yone};
}

                    // {xone, yone}
let {xone: mx, yone} = func(3, 4);

console.log(func(3, 4), mx, yone);
