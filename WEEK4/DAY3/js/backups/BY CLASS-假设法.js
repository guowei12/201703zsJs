function byClass(strClass, context) {
    context = context || document;//=>if(typeof context==='undefined'){context=document;}
    if ('getElementsByClassName' in context) {
        return toArray(context.getElementsByClassName(strClass));
    }
    //->IE6~8
    //->把传递进来的样式类名拆成数组：这样拿数组中的每一项一个个的去对比，只有当前元素的样式类包含传递进来的所有，那么当前这个元素才是我们想要的
    //元素：'box1 box5 box2 box3'
    //传递：'box3 box1' =>'box3' 'box1'
    strClass = strClass.replace(/(^ +| +$)/g, '').split(/ +/g);

    //->获取当前容器中所有元素
    var allList = context.getElementsByTagName('*'),
        ary = [];

    /*--方案一--*/
    //->首先遍历所有的元素,在遍历的过程中看当前元素是否符合要求(拿当前元素的样式类和传递进来的样式数组中的每一项,一项项的进行比较),在比较之前,我们假设当前元素是符合的,在比较的过程中,如果遇到有一个样式类名是当前元素没有的,假设失败,当一个个比较完成后,看假设值是TRUE还是FALSE,为TRUE就把当前元素存储到一个新容器中,最后新容器中存储的内容就是我们想要的
    for (var i = 0; i < allList.length; i++) {
        var curEle = allList[i],
            curEleClass = curEle.className,
            flag = true;//->假设是我们想要的元素

        //->验证假设的结果是正确还是错误
        for (var j = 0; j < strClass.length; j++) {
            var curClass = strClass[j],
                reg = new RegExp('\\b' + curClass + '\\b');
            if (!reg.test(curEleClass)) {
                flag = false;
                break;
            }
        }

        //->如果假设是正确的,我们就把当前元素存储起来
        flag ? ary[ary.length] = curEle : null;
    }

    return ary;
}