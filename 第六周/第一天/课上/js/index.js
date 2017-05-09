// 先出里绑定和this问题

function bind(ele, type, fn) {
    if ('addEventListener' in window) { // 判断是否为标准浏览器
        ele.addEventListener(type, fn, false);
        return;
    }
    if (!ele['fnBox' + type]) {
        ele['fnBox' + type] = []
    } // 这个大盒子相当于事件池
    for (var i = 0; i < ele['fnBox' + type].length; i++) { // 每次添加处理程序的时候,判断是否重复
        if (ele['fnBox' + type][i].fn === fn) {
            return;
        }
    }
    var fnCallBack = function () {
        fn.call(ele);
    }; // 这个盒子是改变this指向用的
    fnCallBack.fn = fn; // 添加一个说明,这个小盒子里边,具体装的是什么

    ele['fnBox' + type].push(fnCallBack); // 这相当于在事件池里边添加方法,为了方便移除的时候,有地方去找绑定的程序,并且找到对应的


    ele.attachEvent('on' + type, fnCallBack);
}
function unbind(ele, type, fn) {
    if ('removeEventListener' in window) { // 判断是否为标准浏览器
        ele.removeEventListener(type, fn, false);
        return;
    }
    var ary = ele['fnBox' + type]; //fnBox 是当前元素的一个属性,值是一个数组,存的是改变this后的监听方法(小工具盒)
    for (var i = 0; i < ary.length; i++) {
        if (ary[i].fn === fn) { // 找到池子里边的盒子,然后看盒子上的说明,装的具体是哪一个fn
            ele.detachEvent('on' + type, ary[i]); // 移除浏览器是事件池的
            ele['fnBox' + type].splice(i, 1); // 而且要移出我记录的
        }
    }
}
// 处理顺序问题的,其实根本就是处理IE事件池乱序问题,那么我们就不能用ie的事件池进行,我们模拟一个事件池(理由发布订阅的思想来模拟我们的事件池)

// 1-监听的时候添加处理程序
// 2-在发布的时候将监听的事件的处理程序都执行
function on(ele, type, fn) {   // 模拟的事件池 事件监听
    if (!ele['my' + type]) {
        ele['my' + type] = []; // 不同事件类型的处理程序,放在事件池不同的小盒子里边
    }
    var fnAry = ele['my' + type];
    for (var i = 0; i < fnAry.length; i++) { // 在放方法的时候,我们判断是否重复
        if (fnAry[i] == fn) {
            return;
        }
    }
    ele['my' + type].push(fn);
    bind(ele, type, run); // 我们不想手动触发(发布);我们还得利用浏览器硬件的发布程序,发布的时候调用我们写的发布程序run
}
// 在事件的处理程序发布的时候,我们的浏览器会默认给每一个事件的处理程序传一个实参,这个实参就是我们的事件对象
function run(e) { // 模拟的事件发布  依次处理
    e = e || window.event;
    e.target = e.target || e.srcElement;
    if (!e.target) {
        e.preventDefault = function () {
            e.returnValue = false;
        };
        e.stopPropagation = function () {
            e.cancelBubble = true;
        }
    }
    var ary = this['my' + e.type];
    for (var i = 0; i < ary.length; i++) {
        ary[i].call(this, e); // 让事件池里边的方法按顺序执行, 把对应的事件对象还需要传给每一处理程序
    }
}
function off(ele, type, fn) { // 找到对应绑定对象  再找到要移除的事件类型  找到要移出fn(方法)
    var ary = ele['my' + type];
    for (var i = 0; i < ary.length; i++) {
        if (ary[i] === fn) {
            ary.splice(i, 1);
            break;
        }
    }
}