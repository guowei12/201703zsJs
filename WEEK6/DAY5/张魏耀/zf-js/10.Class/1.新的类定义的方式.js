/**
 * Created by Weil on 16/3/24.
 */


// 老方法
function MathUtils (x, y) {
  // 构造函数
  this.x = x;
  this.y = y;
}

MathUtils.prototype = {
  constructor: MathUtils,
  add: function () {
    return this.x + this.y;
  },
  subtract: function () {
    return this.x - this.y;
  }
};

let math = new MathUtils(1, 2);
let addRes = math.add();
let subtractRes = math.subtract();
console.log(addRes, subtractRes);


// 新糖果
class MathUtilsNew {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  add () {
    return this.x + this.y;
  }

  subtract () {
    return this.x - this.y;
  }
}


let mathNew = new MathUtilsNew(1, 2);
let addResNew = mathNew.add();
let subtractResNew = mathNew.subtract();
//let multiplyResNew = mathNew.multiply();
console.log(addResNew, subtractResNew);

console.log(MathUtilsNew === MathUtilsNew.prototype.constructor);


let cc = new C();
let c = class C {
  constructor () {

  }

  add () {

  }

  subtract () {

  }
};




























