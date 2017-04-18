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
    curLink.setAttribute('data-flag', -1);
    curLink.setAttribute('data-index', j);
    curLink.onclick = function () {
        tableSort.call(this);
    }
}

function tableSort() {
    var oLis = utils.toArray(oList.getElementsByTagName('li')),
        _this = this,//->this:点击的A标签
        dataFlag = _this.getAttribute('data-flag');
    dataFlag *= -1;
    _this.setAttribute('data-flag', dataFlag);
    oLis.sort(function (a, b) {
        //->this:window
        //->多列实现升降排序,需要控制按照不同的参照内容进行比较：需要知道当前点击的是哪一列(获取索引)
        var dataIndex = parseFloat(_this.getAttribute('data-index'));
        if (dataIndex === 0) {//->上架时间
            var curTime = a.getAttribute('data-time'),
                nexTime = b.getAttribute('data-time');
            curTime = curTime.replace(/-/g, '');
            nexTime = nexTime.replace(/-/g, '');
            return (curTime - nexTime) * dataFlag;
        }

        if (dataIndex === 1) {//->商品价格
            return (a.getAttribute('data-price') - b.getAttribute('data-price')) * dataFlag;
        }

        if (dataIndex === 2) {//->商品热度
            return (a.getAttribute('data-hot') - b.getAttribute('data-hot')) * dataFlag;
        }
    });

    var frg = document.createDocumentFragment();
    for (var i = 0; i < oLis.length; i++) {
        frg.appendChild(oLis[i]);
    }
    oList.appendChild(frg);
    frg = null;
}







