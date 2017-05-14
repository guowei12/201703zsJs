/**
 * Created by Weil on 16/3/26.
 */

// this 关键字的指向是在定义的时候的确定

let obj = {
  num: 123,
  func: function () {
    setTimeout(function () {
      console.log(this === window, 'old');
    });
  },

  funcArrow: function () {
    setTimeout(() => {
      console.log(this.num, 'new');
    });
  },

  func1: function () {
    console.log(this);
  }
};

obj.func();
obj.funcArrow();






