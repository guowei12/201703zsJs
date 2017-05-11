function on(ele, type, fn, boolean) {
    // 监听浏览器事件  type = onclick  click  onmouseover mouseover
    // 监听自定义事件  type = 'slefclick'   加前缀'slef'
    if (/^self/.test(type)) {
        if (!ele['self' + type]) {
            ele['self' + type] = []; // 自定义事件的事件池
        }
        var ary = ele['self' + type];
        for (var i = 0; i < ary.length; i++) {
            var selfFn = ary[i];
            if (selfFn === fn) { // 自定义事件去重,防止重复添加到事件池里边
                return;
            }
        }
        ary.push(fn)
    } else {
        // 如果不是自定事件,就是系统事件,我这里就处理系统事件
        if (ele.addEventListener) {
            boolean = boolean || false;
            ele.addEventListener(type, fn, boolean)
        } else { // 如果是ie浏览器的话我们就创建自定义事件池来接解决,ie事件池的顺序问题
            if (!ele['ie' + type]) {
                ele['ie' + type] = []; // 不用ie的事件池,自己手动创建
                var tepFn = function (e) {
                    e = window.event;
                    run(ele,type,e);
                }; // 在这个事件的触发的时候,找这个事件的事件池,把里边方法拿出来
                ele.attachEvent('on' + type, tepFn)
            }
            var ieAry = ele['ie' + type];
            for (var j = 0; j < ieAry.length; j++) {
                var ieFn = ieAry[j];
                if (ieFn === fn) {
                    return;
                }
            }
            ieAry.push(fn);
        }
    }
}
function run(ele, type,e) {
    if (/^self/.test(type)) {
        var selfAry = ele['self' + type];
        for (var i = 0; i < selfAry.length; i++) {
            var selfFn = selfAry[i];
            selfFn.call(ele)
        }
    } else {
        var ieAry = ele['ie' + type];
        for (var j = 0; j < ieAry.length; j++) {
            var ieFn = ieAry[j];
            ieFn.call(ele, e)
        }
    }
}

function off(ele, type, fn, boolean) {
    if (!/^self/.test(type)) {
        if (ele.removeEventListener) {
            ele.removeEventListener(type, fn, boolean);
            return
        }
        var ieAry = ele['ie' + type];
        for (var i = 0; i < ieAry.length; i++) {
            var ieFn = ieAry[i]; // tempFn
            if (ieFn === fn) {
                ieAry.splice(i, 1);
                break;
            }
        }
    }else {
        var selfAry = ele['self'+ type];
        for (var j = 0; j < selfAry.length; j++) {
            var selfFn = selfAry[j];
            if (selfFn === fn) {
                selfAry.splice(i,1);
                break;
            }
        }
    }
}