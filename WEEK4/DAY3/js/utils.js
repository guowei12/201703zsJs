/*
 * 高级单例模式：
 * ->基于惰性思想,把一些没必要重复操作的事情在开始的时候获取相关的结果,以后直接调取使用即可,节约性能
 * ->我们可以在私有的作用域中尽情的编写方法,这些方法可根据需要,有选择性的挂载到返回的对象上供外面使用,也可以不供外面专为内部方法调取使用
 * ->方法之间的调用,没必要在添加任何的上下文和执行主体,都有私有的方法,可以直接的访问
 * ...
 */
var utils = (function () {
    var isSupport = 'getComputedStyle' in window;//->FALSE(IE6~8) TRUE(STANDARD)

    /*
     * toArray：Converts an array of classes to an array
     * @parameter：
     *   likeAry[object]：Class array to convert
     * @return：
     *   ary[Array]：Convert completed array
     * By Team on 2017-04-16 12:44
     */
    function toArray(likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry);
        } catch (e) {
            for (var i = 0, len = likeAry.length; i < len; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    }

    /*
     * toJSON：Convert JSON string to JSON object
     * @parameter：
     *   str[String]：JSON string
     * @return：
     *   obj[Object]：JSON object
     * By Team on 2017-04-16 12:48
     */
    function toJSON(str) {
        return 'JSON' in window ? JSON.parse(str) : eval('(' + str + ')');
    }

    /*
     * getCss：Gets the value of the specific style property for the current element
     * @parameter：
     *   curEle[object]：current element
     *   attr[string]：style properties of elements
     * @return：
     *   Style attribute values for elements
     * By Team on 2017-04-23 12:29
     */
    function getCss(curEle, attr) {
        var val = null,
            reg = null;
        if (isSupport) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else {
            //->IE6~8
            switch (attr) {
                case 'filter':
                case 'opacity':
                    val = curEle.currentStyle['filter'];
                    reg = /alpha\(opacity=(.+)\)/i;
                    val = reg.test(val) ? RegExp.$1 / 100 : 1;
                    break;
                default:
                    val = curEle.currentStyle[attr];
            }
        }
        reg = /^-?\d+(\.\d+)?(px|rem|em|pt)$/i;
        val = reg.test(val) ? parseFloat(val) : val;
        return val;
    }

    /*
     * getCss：Set the style property value for an element，Setting inline styles for elements
     * @parameter：
     *   curEle[object]：current element
     *   attr[string]：style properties of elements
     *   value：set style property value
     * By Team on 2017-04-23 15:36
     */
    function setCss(curEle, attr, value) {
        if (attr === 'float') {
            curEle['style']['cssFloat'] = value;
            curEle['style']['styleFloat'] = value;
            return;
        }
        if (attr === 'opacity') {
            curEle['style']['opacity'] = value;
            curEle['style']['filter'] = 'alpha(opacity=' + value * 100 + ')';
            return;
        }
        var reg = /^(?:width|height|(?:(?:margin|padding)?(?:top|left|right|bottom)))$/i;
        if (reg.test(attr)) {
            !isNaN(value) ? value += 'px' : null;
        }
        curEle['style'][attr] = value;
    }

    /*
     * setGroupCss：Set the style attribute value for the batch
     * @parameter：
     *   curEle[object]：current element
     *   styleCollection[object]：style collection
     * By Team on 2017-04-23 15:36
     */
    function setGroupCss(curEle, styleCollection) {
        for (var key in styleCollection) {
            if (styleCollection.hasOwnProperty(key)) {
                setCss(curEle, key, styleCollection[key]);
            }
        }
    }

    /*
     * css：The style properties of the operating element, including the capture style, the individual settings style, and the batch settings style
     * @parameter：
     *   curEle[object]：current element
     * By Team on 2017-04-23 15:36
     */
    function css() {
        var arg = arguments;
        if (arg.length >= 3) {
            //->SET CSS
            setCss.apply(this, arg);
            return;
        }
        if (arg.length === 2 && typeof arg[1] === 'object') {
            //->SET GROUP CSS
            setGroupCss.apply(this, arg);
            return;
        }
        return getCss.apply(this, arg);
    }

    /*
     * offset：Gets the offset of the current element distance BODY
     * @parameter：
     *   curEle[object]：current element
     * @return：
     *   [object]：{top:xxx,left:xxx}
     * By Team on 2017-04-23 16:43
     */
    function offset(curEle) {
        var l = curEle.offsetLeft,
            t = curEle.offsetTop,
            p = curEle.offsetParent;
        while (p) {
            if (navigator.userAgent.indexOf('MSIE 8') === -1) {
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }
        return {top: t, left: l};
    }

    /*
     * hasClass：Verify that the current element contains a single style class name
     * @parameter：
     *   curEle[object]：current element
     *   cName[string]：class name to validate
     * @return：
     *   [boolean]：true/false
     * By Team on 2017-04-29 11:16
     */
    function hasClass(curEle, cName) {
        //-> \b会忽略'xxx-xxx'的样式类名,-的左右也会被\b匹配到,所以为了更加的严谨,我们的正则应该使用/(^| +)xxx( +|$)/
        return new RegExp('(^| +)' + cName + '( +|$)').test(curEle.className);
    }

    /*
     * hasClass：Adds a class name to the current element
     * @parameter：
     *   curEle[object]：current element
     *   strClass[string]：Need to increase the style class name, can be more than, for example:'xxx','xxx xxx', '  xxx    xxx  '...
     * By Team on 2017-04-29 11:28
     */
    function addClass(curEle, strClass) {
        strClass = strClass.replace(/(^ +| +$)/g, '').split(/ +/g);
        for (var i = 0; i < strClass.length; i++) {
            var curClass = strClass[i];
            if (!hasClass(curEle, curClass)) {
                curEle.className += ' ' + curClass;
            }
        }
    }

    /*
     * removeClass：Remove a class name to the current element
     * @parameter：
     *   curEle[object]：current element
     *   strClass[string]：Need to deleted the style class name, can be more than, for example:'xxx','xxx xxx', '  xxx    xxx  '...
     * By Team on 2017-04-29 11:44
     */
    function removeClass(curEle, strClass) {
        strClass = strClass.replace(/(^ +| +$)/g, '').split(/ +/g);
        for (var i = 0; i < strClass.length; i++) {
            var curClass = strClass[i],
                reg = new RegExp('(^| )' + curClass + '( |$)', 'g');
            hasClass(curEle, curClass) ? curEle.className = curEle.className.replace(/ /g, '  ').replace(reg, ' ') : null;
        }
        curEle.className = curEle.className.replace(/(^ +| +$)/g, '');
    }

    /*
     * toggleClass：If the passing style class name exists in the element, the delete operation is an operation
     * @parameter：
     *   curEle[object]：current element
     *   strClass[string]：class name to be operated
     * By Team on 2017-04-29 12:00
     */
    function toggleClass(curEle, strClass) {
        strClass = strClass.replace(/(^ +| +$)/g, '').split(/ +/g);
        for (var i = 0; i < strClass.length; i++) {
            var curClass = strClass[i];
            hasClass(curEle, curClass) ? removeClass(curEle, curClass) : addClass(curEle, curClass);
        }
    }

    /*
     * byClass：Gets a set of elements by the element's style class，Compatible IE low version browser
     * @parameter：
     *   strClass[string]：class name to be operated
     *   context[HTMLElementObject]：get the range, the default is document
     * @return：
     *   [Array]：All matching results
     * By Team on 2017-04-29 12:56
     */
    function byClass(strClass, context) {
        context = context || document;
        if (isSupport) {
            return toArray(context.getElementsByClassName(strClass));
        }
        //->IE6~8
        var allList = context.getElementsByTagName('*'),
            ary = [],
            reg = null;
        strClass = strClass.replace(/(^ +| +$)/g, '')
            .replace(/ +/g, '@@')
            .replace(/(?:^|@)([\w-]+)(?:@|$)/g, '(?=.*(^| +)$1( +|$).*)');
        reg = new RegExp(strClass);
        for (i = 0; i < allList.length; i++) {
            var cur = allList[i];
            reg.test(cur.className) ? ary[ary.length] = cur : null;
        }
        return ary;
    }

    return {
        toArray: toArray,
        toJSON: toJSON,
        css: css,
        offset: offset,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        byClass: byClass
    }
})();