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
    htmlStr += `<li><a href="javascript:;">
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

}







