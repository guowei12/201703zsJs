/**
 * Created by 39753 on 2017/5/11.
 */
function on(ele, type, fn, bool) {
     // 自定的监听
    if (/^self/.test(type)) {
        if (!ele['self' + type]) {
            ele['self' + type] = [];
        }
        var ary = ele['self' + type];
        for (var i = 0; i < ary.length; i++) {
            var f = ary[i];
            if (f == fn) {
                return
            }
        }
        ary.push(fn);
        return;
    }

    if (ele.addEventListener) {
        ele.addEventListener(type, fn, bool);
    } else {
        if (!ele['ie' + type]) {
            ele['ie' + type] = []; // 模拟事件池
            var tempFn = function (e) {
                e = e || window.event;
                run(ele, type, e)
            };
            //tempFn.fn = fn;
            ele.attachEvent('on' + type, tempFn)
        }
        var ieAry = ele['ie' + type];
        for (var m = 0; m < ieAry.length; m++) {
            var ieFn = ieAry[m];
            if (tempFn === ieFn) {
                return;
            }
        }
        ieAry.push(tempFn);
    }
}

function run(ele, type, e) {
    if (!/^self/.test(type)) {
        e = window.event;
        e.target = e.srcElement;
        e.preventDefault = function () {
            e.returnValue = false;
        };
        e.stopPropagation = function () {
            e.cancelBubble = true;
        };

        e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
        e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
        var fnAry = ele['ie' + type];
        for (var i = 0; i < arguments.length; i++) {
            var fn = arguments[i];
            fn.call(ele, e);
        }
    }

    if (/^self/.test(type)) {
        var selfAry = ele['self' + type];
        if (selfAry) {
            for (var k = 0; k < selfAry.length; k++) {
                var selfFn = selfAry[k];
                selfFn.call(ele);
            }
        }
    }
}


function off(ele, type, fn, bool) { // 移除事件
    if (!/^self/.test(type)) {
        if (ele.removeEventListener) {
            bool = bool || false;
            ele.removeEventListener(type, fn, bool)
        } else {
            var ary = ele['ie' + type];
            for (var j = 0; j < ary.length; j++) {
                var ieFn = ary[j];
                if (ieFn.fn == fn) {
                    ele.detachEvent(type, ieFn.fn);
                    ary.splice(j, 1);
                }
            }
        }
    } else {
        var selfAry = ele['self' + type];
        if (selfAry) {
            for (var n = 0; n < selfAry.length; n++) {
                var selfFn = selfAry[n];
                if (selfFn == fn) { // 找统一的事件池,找的方法
                    selfAry.splice(n, 1);
                    break;
                }
            }
        }
    }
}