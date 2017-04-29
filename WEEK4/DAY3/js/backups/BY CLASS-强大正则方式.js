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
    if ('getElementsByClassName' in context) {
        return toArray(context.getElementsByClassName(strClass));
    }
    //->IE6~8
    strClass = strClass.replace(/(^ +| +$)/g, '').split(/ +/g);
    var allList = context.getElementsByTagName('*'),
        ary = [];

    //->创建一个非常强大的正则：一条正则就可以满足验证当前元素中是否必须包含我们传递的样式类名，FOR EXAMPLE：/(?=(.+)?\bbox3\b(.+)?)(?=(.+)?\bbox1\b(.+)?)/...
    var regStr = '',
        reg = null;
    for (var i = 0; i < strClass.length; i++) {
        regStr += '(?=.*\\b' + strClass[i] + '\\b.*)';
    }
    reg = new RegExp(regStr);

    //->遍历所有的元素，找到符合正则的元素
    for (i = 0; i < allList.length; i++) {
        var cur = allList[i];
        reg.test(cur.className) ? ary[ary.length] = cur : null;
    }
    return ary;
}