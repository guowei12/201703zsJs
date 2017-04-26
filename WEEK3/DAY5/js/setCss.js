/*
 * getCss：Set the style property value for an element，Setting inline styles for elements
 * @parameter：
 *   curEle[object]：current element
 *   attr[string]：style properties of elements
 *   value：set style property value
 * By Team on 2017-04-23 15:36
 */
function setCss(curEle, attr, value) {
    //->如果设置的样式是FLOAT,我们也需要处理兼容
    if (attr === 'float') {
        curEle['style']['cssFloat'] = value;
        curEle['style']['styleFloat'] = value;
        return;
    }

    //->如果设置的样式是透明度,为了兼容低版本的浏览器,我们需要设置两套
    if (attr === 'opacity') {
        curEle['style']['opacity'] = value;
        curEle['style']['filter'] = 'alpha(opacity=' + value * 100 + ')';
        return;
    }

    //->给部分样式属性做特殊处理：如果传递进来的样式属性值没有加单位的话,我们默认给补充PX这个单位
    //=>width、height、top、left、bottom、right、marginLeft(其余三个方向)、paddingLeft(其余三个方向)...
    var reg = /^(?:width|height|(?:(?:margin|padding)?(?:top|left|right|bottom)))$/i;
    if (reg.test(attr)) {
        !isNaN(value) ? value += 'px' : null;
    }
    curEle['style'][attr] = value;
}