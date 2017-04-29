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
    var allList = toArray(context.getElementsByTagName('*'));
    for (var i = 0; i < strClass.length; i++) {
        var curClass = strClass[i],
            reg = new RegExp('\\b' + curClass + '\\b');
        for (var j = 0; j < allList.length; j++) {
            var curEle = allList[j];
            if (!reg.test(curEle.className)) {
                allList.splice(j, 1);
                j--;
            }
        }
    }
    return allList;
}