//->第一步：从服务器端获取数据，把获取的数据动态展示在页面中
//->1、发送AJAX请求(四步),获取我们需要的数据
var resultData = null;
var xhr = new XMLHttpRequest();
xhr.open('GET', 'json/product.json', false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        resultData = xhr.responseText;
    }
};
xhr.send(null);

//->2、把获取到的JSON字符串转换为对象
resultData = utils.toJSON(resultData);

//->3、循环获取的结果，动态绑定数据(ES6中的模板字符串)
var htmlStr = ``;//->这不是单引号,而是数字键盘最左边那个键按出来的(WB默认是不支持ES6的语法,我们需要File->Settings->Languages && ...->JavaScript->把右侧出现的语言版本改为ECMAScript 6即可)
for (var i = 0, len = resultData.length; i < len; i++) {
    var curObj = resultData[i];
    //->标准话的自定义属性使用"data-xxx=xxx"
    htmlStr += `<li data-time="${curObj.time}" data-price="${curObj.price}" data-hot="${curObj.hot}"><a href="javascript:;">
            <img src="${curObj.img}" alt="">
            <p>${curObj.title}</p>
            <span>￥${curObj.price}</span>
        </a></li>`;
}
var oList = document.getElementById('list');
oList.innerHTML = htmlStr;

//->第二步：点击不同的维度，让其按照对应的维度进行升降序切换
//->1、获取三个按钮，然后绑定点击事件，点击的时候实现排序
var header = document.getElementById('header'),
    linkList = header.getElementsByTagName('a');
for (var j = 0; j < linkList.length; j++) {
    var curLink = linkList[j];
    curLink.onclick = function () {
        tableSort();
    }
}

//->2、定义一个方法实现排序操作，点击事件触发只需要执行这个方法即可
function tableSort() {
    //->获取所有的LI，把获取的类数组转换为数组
    var oLis = utils.toArray(oList.getElementsByTagName('li'));

    //->按照上架时间升序排序
    oLis.sort(function (a, b) {
        //->我们需要获取当前LI对应的上架时间：数据绑定的时候我们知道这个时间，后面需要使用，这样的话符合了“所有在后面的操作中想用之前值的，都可以事先把信息存储在元素的自定义属性上，以后需要使用的时候，直接的获取即可=>自定义属性编程思想”，我们在绑定数据的时候，把所有后面需要使用的内容都存储在自定义属性上，用的时候直接的获取即可
        var curTime = a.getAttribute('data-time'),
            nexTime = b.getAttribute('data-time');
        curTime = curTime.replace(/-/g, '');
        nexTime = nexTime.replace(/-/g, '');
        return curTime - nexTime;
    });

    //->按照最新的顺序，把页面中的HTML结构也修改了
    var frg = document.createDocumentFragment();
    for (var i = 0; i < oLis.length; i++) {
        frg.appendChild(oLis[i]);
    }
    oList.appendChild(frg);
    frg = null;
}







