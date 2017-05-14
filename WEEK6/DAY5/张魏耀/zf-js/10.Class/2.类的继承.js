/**
 * Created by Weil on 16/3/24.
 */

// 父类
class MathUtils {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    console.log(x, y, "---parent");
  }

  add () {
    return this.x + this.y;
  }

  sub () {
    return this.x - this.y;
  }
}

// 子类
class SuperMathUtils extends MathUtils {
  constructor (x, y) {
    super(x, y);
    this.x = x;
    this.y = y;
  }

  multiply() {
    return x * y;
  }

  divide () {
    return x / y;
  }
  add () {
    return super.add();
  }
}

class SuperMathUtilsNew extends SuperMathUtils {
  constructor (x, y) {
    super(x, y);
    this.x = x;
    this.y = y;
  }

  multiply() {
    return x * y;
  }

  divide () {
    return x / y;
  }
  add () {
    return super.add();
  }
}

let a = new SuperMathUtilsNew;
a.add(1, 2);


let su = new SuperMathUtils(1, 2);
console.log(su.add());

function A () {

}
A.prototype = {
  constructor: A,
  add: function () {

  },
  sub: function () {

  }
};

function B () {

}
B.prototype = new B();

B.prototype = {
  constructor: B,
  multiply: function () {

  },
  divide: function () {

  }
};



























