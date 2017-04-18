//->第一步：从服务器端获取数据，把获取的数据动态展示在页面中
var resultData = null;
var xhr = new XMLHttpRequest();
xhr.open('GET', 'json/product.json', false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        resultData = xhr.responseText;
    }
};
xhr.send(null);
resultData = utils.toJSON(resultData);
var htmlStr = ``;
for (var i = 0, len = resultData.length; i < len; i++) {
    var curObj = resultData[i];
    htmlStr += `<li data-time="${curObj.time}" data-price="${curObj.price}" data-hot="${curObj.hot}"><a href="javascript:;">
            <img src="${curObj.img}" alt="">
            <p>${curObj.title}</p>
            <span>￥${curObj.price}</span>
        </a></li>`;
}
var oList = document.getElementById('list');
oList.innerHTML = htmlStr;

//->第二步：点击不同的维度，让其按照对应的维度进行升降序切换
var header = document.getElementById('header'),
    linkList = header.getElementsByTagName('a');
for (var j = 0; j < linkList.length; j++) {
    var curLink = linkList[j];
    curLink.setAttribute('data-flag', -1);//->data-flag:存储排序时候需要乘以的那个因子(1/-1),默认是-1,我们可以根据改变这个值的正负来实现升降序的切换

    curLink.onclick = function () {
        //->this:当前点击的这个A标签
        //tableSort();//->this:window
        tableSort.call(this);//->this:当前点击的这个A标签
    }
}

function tableSort() {
    var oLis = utils.toArray(oList.getElementsByTagName('li'));

    //->每一次执行排序方法,都把升降序切换标识在原来的基础上乘以负一,这样可以保证排序的顺序是在一直切换的
    var dataFlag = this.getAttribute('data-flag');
    dataFlag *= -1;
    this.setAttribute('data-flag', dataFlag);

    oLis.sort(function (a, b) {
        var curTime = a.getAttribute('data-time'),
            nexTime = b.getAttribute('data-time');
        curTime = curTime.replace(/-/g, '');
        nexTime = nexTime.replace(/-/g, '');
        return (curTime - nexTime) * dataFlag;//->按照A-B的模式来写,如果乘以一个一则为升序,如果乘以一个负一,正好相反属于降序,知道此原理后,我们只需要控制乘以这个因子的正负即可
    });
    var frg = document.createDocumentFragment();
    for (var i = 0; i < oLis.length; i++) {
        frg.appendChild(oLis[i]);
    }
    oList.appendChild(frg);
    frg = null;
}







