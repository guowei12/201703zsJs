function getCss(curEle, attr) {
    var val = null,
        reg = null;
    if ('getComputedStyle' in window) {
        val = window.getComputedStyle(curEle, null)[attr];
    } else {
        //->IE6~8
        //->在低版本浏览器中,如果传递的ATTR是OPACITY,说明用户想获取的是透明度,但是低版本浏览器中的透明度使用FILTER滤镜处理,所以这一点我们也需要做特殊的处理
        switch (attr) {
            case 'filter':
            case 'opacity':
                val = curEle.currentStyle['filter'];//->'alpha(opacity=[number(opacity*100)])'
                reg = /alpha\(opacity=(.+)\)/i;
                //val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
                val = reg.test(val) ? RegExp.$1 / 100 : 1;
                break;
            default:
                val = curEle.currentStyle[attr];
        }
    }

    //->去除部分结果的单位：左侧是有效数字，右侧是单位的，都有可以去掉单位，对于复合值或者其它非数字的样式值，我们不管
    reg = /^-?\d+(\.\d+)?(px|rem|em|pt)$/i;
    val = reg.test(val) ? parseFloat(val) : val;
    return val;
}