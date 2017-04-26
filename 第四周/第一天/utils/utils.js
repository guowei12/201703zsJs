var utils = (function () {
    var flag = "getComputedStyle" in window;

    //->listToArray:把类数组集合转换为数组
    function listToArray(likeAry) {
        if (flag) {
            return Array.prototype.slice.call(likeAry, 0);
        }
        var ary = [];
        for (var i = 0; i < likeAry.length; i++) {
            ary[ary.length] = likeAry[i];
        }
        return ary;
    }

    //->formatJSON:把JSON格式字符串转换为JSON格式对象
    function formatJSON(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
    }

    //->offset:获取页面中任意元素距离BODY的偏移
    function offset(curEle) {
        var disLeft = curEle.offsetLeft, disTop = curEle.offsetTop, par = curEle.offsetParent;
        while (par) {
            if (navigator.userAgent.indexOf("MSIE 8") === -1) {
                disLeft += par.clientLeft;
                disTop += par.clientTop;
            }
            disLeft += par.offsetLeft;
            disTop += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: disLeft, top: disTop};
    }

    //->win:操作浏览器的盒子模型信息
    function win(attr, value) {
        if (typeof value === "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }

    //->getCss:获取元素的样式值
    function getCss(curEle, attr) {
        var val = null, reg = null;
        if (flag) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else {
            if (attr === "opacity") {
                val = curEle.currentStyle["filter"];
                reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        reg = /^(-?\d+(\.\d+)?)(px|pt|em|rem)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    }

    //->children:获取所有的元素子节点
    function children (ele) {
        //2 找到所有的子节点
        // 子节点
        var ary = [];
        if (!'getComputedStyle' in window) {
            var childs = ele.childNodes;
            for (var i = 0; i< childs.length; i++) {
                var item = childs[i];
                // nodeType ==1说明当前节点为元素节点;
                // ary.push(item) 把找到的每一项放进篮子到时候集体返回(产出);
                item.nodeType == 1 ? ary[ary.length] = item : null;
                // push的优化
            }
        } else {
            return listToArray(ele.children);
        }

        return ary;
    }

    //->获取上一个,哥哥节点
    function prev(ele) {
        if (flag) {
            return ele.previousElementSibling;
        }else {
            var pre = ele.previousSibling;// 获取元素的上一个哥哥节点,先找到他的哥哥节点看看
            // 重复的循环和判断一个事情,我们就会想到while循环判断
            while (pre && pre.nodeType !== 1) {
                pre = pre.previousSibling;
            }
            return pre;
            // ele.previousElementSibling;// 获取上一个元素节点
        }
    }

    // 获取下一个元素弟弟节点
    function next (ele) {
        if (flag) {
            return ele.nextElementSibling;
        }else {
            var next = ele.nextSibling;// 获取元素的上一个哥哥节点,先找到他的哥哥节点看看
            // 重复的循环和判断一个事情,我们就会想到while循环判断
            while (next && next.nodeType !== 1) {
                next = next.nextSibling;
            }
            return next;
            // ele.nextElementSibling;// 获取下一个元素节点
        }
    }

    // 获取所有的哥哥节点
    function prevAll (ele) {
        var ary = [];
        var pre = prev(ele);
        while (pre) {// 如果进入循环,说明上一个哥哥元素节点是有的,得给他先放到容器里边
            ary.unshift(pre);
            pre = prev(pre)
        }
        return ary;
    }

    // 获取所有的弟弟节点
    function nextAll (ele) {
        var ary = [];
        var nex = next(ele);
        while (nex) {// 如果进入循环,说明上一个哥哥元素节点是有的,得给他先放到容器里边
            ary.push(nex);
            nex = next(nex)
        }
        return ary;
    }

    //->获取相邻节点  (相邻的:上一个哥哥节点+下一个元素弟弟节点)
    function sibling (ele) {
        var ary = [] ;
        var pre = prev(ele),next = next(ele);
        pre ? ary.push(pre) : null;
        next ? ary.push(next) : null;
    }

    // ->获取所有的元素兄弟节点
    function siblings(ele) {
        var preAll = prevAll(ele),nextA =  nextAll(ele);
        return preAll.concat(nextA);
    }

    //->获取当前元素的索引
    function index (ele) {
        return prevAll(ele).length;
    }

    //->firstChild:获取第一个元素子节点
    function firstChild (ele) {
        var chil = children(ele);
        return chil.length > 0 ? chil[0] :null;
    }

    //->lastChild:获取最后一个
    function lastChild(ele) {
        var chil = children(ele);
        return chil.length > 0 ? chil[chil.length-1] :null;
    }

    // appendChild 向指定的(元素)容器末尾追加元素
    function append (container,newEle) {
        container.appendChild(newEle);
    }

    // prepend 向执行的(元素)容器开头位置追加元素
    // 向指定的元素之前添加元素: 盒子.insertBefor(newEle,old)
    function prepend (container, newEle) {
        var firstEle = firstChild(container);
        if (firstEle) {
            container.insertBefore(newEle, firstEle);
            return;
        }
        container.appendChild(newEle);
    }

    // inserBefore:在某个元素之前追加
    function insertBefore (oldEle, newEle) {
        oldEle.parentNode.insertBefore(newEle,oldEle);
    }

    // insertAfer:在指定元素后边添加新元素
    // 找到当前元素的,下一个弟弟元素,然后再下一个弟弟元素之前追加元素
    function inserAfter(ele,newEle) {
        var nextEle = next(ele);
        if (nextEle) {
            insertBefore(nextEle,newEle);
            return;
        }
        ele.parentNode.appendChild(newEle);
    }

    // 判断某一元素的类名
    function hasClass (ele, className) {
        var reg = new RegExp('(^| +)'+ className + '( +|$)');
        // var reg = new RegExp('\\b'+ classname +'\\b'); 通过分届符来找到类名
        return reg.test(ele.className);
    }

    // 给一个元素添加类名
    function addClass (ele, newClass) {
        // newClass 可是能是一个'newClass'
        // 也可能是多个' class1 asdasd1 class2 ';

        var aryClass = newClass.replace(/(^ +| +$)/g,'').split(/ +/g);

        // ary=(newClass.replace(/ +/g,' ')).replace(/^ | $/g,'').split(' ');
        // 这个正则先将所有的空格都换成一个空格,然后将开头和结束的空格替换掉,注:在第二个正则中,没有进行分组,直接是大正则进行的匹配替换

        for (var i = 0; i < aryClass.length; i++) {
            var itemClass = aryClass[i];
            if (!hasClass(ele,itemClass)) {
                ele.className+= '' + itemClass;
            }
        }
    }

    // 给一个元素删除类名
    function removeClass (ele, newClass) {
        // newClass 可是能是一个'newClass'
        // 也可能是多个' class1 asdasd1 class2 ';

        var aryClass = newClass.replace(/(^ +| +$)/g,'').split(/ +/g);

        // ary=(newClass.replace(/ +/g,' ')).replace(/^ | $/g,'').split(' ');
        // 这个正则先将所有的空格都换成一个空格,然后将开头和结束的空格替换掉,注:在第二个正则中,没有进行分组,直接是大正则进行的匹配替换

        for (var i = 0; i < aryClass.length; i++) {
            var itemClass = aryClass[i];
            if (hasClass(ele,itemClass)) {
                // 我们把替换的每一项拿出来, 跟我们之前类名 ele.className(将这堆字符串的类名,分隔成数组,然后每一项拿出来跟当前项比较,相同就删除,不相同toString , 讲 ','替换成空格)  '思考题'
                var reg = new RegExp('(^| +)'+ className + '( +|$)', g);
                ele.className.replace(reg, '')
            }
        }
    }

    // document.getElementsByClassName兼容写法
    function  getElementsByClassName (context,className) {
        // 先把上下文传进来,把类名传进来
        // context dom节点 document
        context = context || document; // 如果没有上下文的情况下我们通过DOM的老大document查找
        // 查看兼容
        if (flag) {
            return listToArray(context.getElementsByClassName(className))
        }else {
            // 做兼容处理
            // IE 6 ~ 8
            var ary = [];
            var aryClass = className.replace(/(^ +| +$)/g,'').split(/ +/g);//将我们要匹配的类名集合拆分成数组

            // 先把所有的标签都拿到
            var allTag = context.getElementsByTagName('*');

            // 循环所有的标签(开始) 第一个for循环是拿所有标签
            for (var i = 0 ; i<allTag.length; i++) {
                var flag = true; // 给每个标签打一个标记
                var item = allTag[i];
                // 循环比较每个标签的类名和我们查找的所有的类名是否一样
                // 第二个for循环,是把我们要匹配的类名和我们标签上的类名进行正则匹配
                for (var k = 0; k < aryClass.length; k++) { // 'A B C D'
                    if(!hasClass(item,aryClass[k])){
                        // 如果有类名不包含则标记就改变
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    ary.push(item)
                }
            }// 循环所有的标签(结束)
            return ary;
        }
    }

    //->把外界需要使用的方法暴露给utils
    return {
        win: win,
        offset: offset,
        listToArray: listToArray,
        formatJSON: formatJSON,
        getCss: getCss,
        children: children,
        prev:prev,
        next: next,
        prevAll:prevAll,
        nextAll: nextAll,
        getElementsByClassName: getElementsByClassName
    }
})();