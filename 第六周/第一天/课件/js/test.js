/*
 * 处理dom2级事件的绑定方法兼容问题
 * */
// 先解决绑定
// 再解决this
// 再利用发布订阅思想自己写事件池解决顺序问题
// 再解决重复问题
// var tempFn = null;  这时候就删除了所有;
function bind(ele, type, fn) {
    if ('addEventListener' in window) {
        ele.addEventListener(type, fn, false);
        return;
    }
    // 这相当于给原有函数包装了一下
    var tempFn = function () {
        fn.call(ele);
    };
    tempFn['photo'] = fn;
    // 创建一个数组(大盒子),将我们的方法都包装的小盒子都放进去保存起来
    if (!ele['myBind' + type]) {
        ele['myBind' + type] = [];
    }
    var boxFn = ele['myBind' + type];
    for (var i = 0; i < boxFn.length; i++) {
        if (boxFn[i] === fn) {
            return;
        }
    }
    ele['myBind' + type].push(tempFn);
    ele.attachEvent('on' + type, tempFn);

}
function unbind(ele, type, fn) {
    if ('removeEventListener' in window) {
        ele.removeEventListener(type, fn);
        return;
    }
    var fnBox = ele['myBind' + type];
    for (var i = 0; i < fnBox.length; i++) {
        if (fn == fnBox[i].fn) { // 我们监听的是包装后的函数,是一个小盒子,
            ele.detachEvent('on' + type, fnBox[i]);//
            fnBox.splice(i, 1);// 原有数组改变
            // 这样算是不行的我们得找小盒子,但是我们现在不知道小盒子是谁,我们得去找小盒子,所以我们在函数放进小盒子的时候我们贴一个标签给他
            //  不仅移出浏览器的,还要移出我们自己的盒子的
            break;
        }
    }
}
// 顺序问题 我们就不能用浏览器的事件池,从根源里去解决问题;这时候就用到了订阅发布模式
// 模拟事件池
function on(ele, type, fn) {
    if (!ele['myEven' + type]) {
        ele['myEven' + type] = [];
    }
    var boxAry = ele['myEven' + type];
    for (var i = 0; i < boxAry.length; i++) {
        if (boxAry[i] === fn) {
            return;
        }
    }
    boxAry.push(fn);
    bind(ele, type, run)
}
// 把监听订阅的事件以及方法移出事件池
function off(ele, type, fn) {
    var aryBox = ele['myEvent' + type];
    for (var i = 0; i < aryBox.length; i++) {
        if (aryBox[i] === fn) {
            aryBox.splice(i, 1);
            break;
        }
    }
}
// 将某种事件的函数依次执行
function run(e) {
    e = e || window.event;
    var flag = e.target ? true : false;//->IE6~8下不兼容e.target,得到的flag为false
    if (!flag) {
        e.target = e.srcElement;
        e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
        e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
        e.preventDefault = function () {
            e.returnValue = false;
        };
        e.stopPropagation = function () {
            e.cancelBubble = true;
        };
    }
    var ary = this['myEven' + e.type];
    for (var i = 0; i < ary.length; i++) {
        ary[i].call(this, e)
    }
}