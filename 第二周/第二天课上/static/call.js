/**
 * Created by 39753 on 2017/4/11.
 */
//call
var obj = {
    myname:'laogeng'
};
function fn (food) {
    this.myname = 'zhaoxuan'
    console.log(this.myname+'like'+food);
    console.log(this);
}
//fn.call();
//fn.call(null);
//fn.call(undefined);//这里的this都是window
//"use strict"
//fn.call(); // this undefined
//fn.call(null);// null
//fn.call(undefined);//这里的this都是undefined

    var newfn = fn.bind(obj);//只是改变fn的this，但是fn不执行。bind()是一个方法，返回值就是改变this后的函数
    //newfn('pingguo');

// 非严格模式下，没有函数没有调用对象，函数的this就是window，严格模式下的函数没有调用对象，this就指向undefined
