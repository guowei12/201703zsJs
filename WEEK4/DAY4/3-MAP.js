// var ary = [12, 23, 34, 45, 56];
// var newAry = ary.map(function (item, index) {
//     //console.log(item, index);
//     return item * 10;
// });
// console.log(ary);
// console.log(newAry);
//=>MAP是在FOREACH的基础上增加了返回值的处理(返回的值是修改数组当前项内容的),FOREACH不支持返回值(原有数组都不变)

//======================================
// var ary = [12, 23, 34, 45, 56];
// ary.map(function (item, index) {
//     console.log(this);//->window
// });
// ary.map(function (item, index) {
//     console.log(this);//->ary MAP传递的第二个参数其实就是在指定回调函数的THIS指向呢,不传递默认是window (只有MAP/FOREACH支持这个语法,SORT等方法都不支持)
// }, ary);

//======================================
// function fn() {
//     console.log(arguments);
// }
// //window.setTimeout("fn()", 1000);//->1S后相当于把字符串EVAL了,这种写法不建议使用,但是有些时候这样写有优势,需求:1S后执行FN,并且给函数传递100和200
//
// window.setTimeout("fn(100,200)", 1000);//->OK ARG=[100,200]
// window.setTimeout(fn, 1000);//->NO ARG=[]
// window.setTimeout(fn.bind(null, 100, 200), 1000);//->OK ARG=[100,200] 不兼容IE低版本浏览器
// window.setTimeout(function (a, b) {
//     return function () {
//         console.log(a, b);
//     };
// }.call(null, 100, 200), 1000);

//======================================
Array.prototype.myMap = function myMap() {
    //->this：ary
    if ('map' in Array.prototype) {
        return this.map.apply(this, arguments);
    }
    var callBack = arguments[0],
        context = arguments[1] || window,
        newAry = this.slice();
    for (var i = 0; i < newAry.length; i++) {
        var cur = newAry[i];
        newAry[i] = callBack && callBack.call(context, cur, i);
    }
    return newAry;
};
// var ary = [12, 23, 34, 45, 56];
// var newAry = ary.myMap(function (item, index) {
//     //console.log(item, index);
//     return item * index;
// });
// console.log(ary, newAry);
//->思考题：回去后扩展 myForEach/myReplace/mySort

//======================================
function each(option, callBack) {
    if (typeof option === 'object' && 'length' in option) {
        for (var i = 0; i < option.length; i++) {
            var cur = option[i];
            callBack && callBack.call(option, cur, i);
        }
        return;
    }
    for (var attr in option) {
        if (option.hasOwnProperty(attr)) {
            callBack && callBack.call(option, option[attr], attr);
        }
    }
}

var obj = {a: 1, b: 2};
each(obj, function (item, index) {
    //->item:value
    //->index:key
    console.log(item, index, this);
});

var ary = [12, 23, 34];
each(ary, function (item, index) {
    //->item
    //->index
    //->this:ary
    console.log(item, index, this);
});

~function () {
    each(arguments, function (item, index) {
        //->item
        //->index
        //->this:arguments
        console.log(item, index, this);
    });
}(100, 200, 300);





















