/*
 * setGroupCss：Set the style attribute value for the batch
 * @parameter：
 *   curEle[object]：current element
 *   styleCollection[object]：style collection
 * By Team on 2017-04-23 15:36
 */
function setGroupCss(curEle, styleCollection) {
    //->循环传递进来的样式集合,调取SET CSS方法,给当前元素逐一设置样式即可
    for (var key in styleCollection) {
        if (styleCollection.hasOwnProperty(key)) {
            setCss(curEle, key, styleCollection[key]);
        }
    }
}