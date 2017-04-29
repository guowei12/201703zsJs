/*
 * 实现HTML页面中动画的方式：
 * ->CSS3动画
 * ->JS中的定时器动画(CANVAS中的动画也是拿JS/CSS3实现的,SVG如此,他们仅仅是用来绘制图形的=>CANVAS使用JS,SVG使用XML)
 * ->requestAnimationFrame这个也是JS动画
 * ->FLASH动画
 */
~function () {

    var utils = (function () {
        var isSupport = 'getComputedStyle' in window;

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

        return {css: css}
    })();

    /*
     * zhufengEffect：Storage is the formula of motion
     */
    var zhufengEffect = {
        /*
         * linear：uniform motion
         * @parameters：
         *   t：times，Time to already exercise
         *   b：begin，Start position
         *   c：change，Total distance , Formula equals Target position - Start position
         *   d：duration，Total Time
         * @return：
         *   Current location
         */
        linear: function (t, b, c, d) {
            return t / d * c + b;
        }
    };


    /*
     * animate：Encapsulates an animation library, to achieve the animation operation of an element
     * @parameters：
     *    curEle[HTMLElement]：current element
     *    target[object]：Target location set, for example:{top:100, left:200}...
     *    duration[number]：Total time of current animation(unit is milliseconds)
     *
     * By Team on 2017/04/29 17:56
     */
    function animate(curEle, target, duration) {
        var times = 0,
            timer = null,
            begin = {},
            change = {};

        //->GET BEGIN AND CHANGE
        for (var key in target) {
            if (target.hasOwnProperty(key)) {
                begin[key] = utils.css(curEle, key);
                change[key] = target[key] - begin[key];
            }
        }

        timer = window.setInterval(function () {
            times += 17;
            if (times >= duration) {
                //->animation end
                utils.css(curEle, target);
                window.clearInterval(timer);
                return;
            }

            //->animation ing
            for (var key in target) {
                if (target.hasOwnProperty(key)) {
                    var curP = zhufengEffect.linear(times, begin[key], change[key], duration);
                    utils.css(curEle, key, curP);
                }
            }
        }, 17);//->minTime：IE(10~13ms) Chrome(5~6ms) advice use 17ms
    }

    window.zhufengAnimate = animate;
}();