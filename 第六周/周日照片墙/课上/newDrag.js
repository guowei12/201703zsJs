function down(e) {
    e = e || window.event;
    //->记录开始位置的信息
    this["strX"] = e.clientX;
    this["strY"] = e.clientY;
    this["strL"] = parseFloat(this.style.left);
    this["strT"] = parseFloat(this.style.top);

    //->给元素绑定移动和抬起的事件
    if (this.setCapture) {
        this.setCapture();//->把当前的鼠标和this(#box)绑定在一起
        this.onmousemove = move;
        this.onmouseup = up;
    } else {
        //document.onmousemove = move;
        //document.onmouseup = up;
        //->这样绑定个话,move和up中的this都变为document了
        var _this = this;//->_this就是#box
        document.onmousemove = function (e) {
            //this->document
            //move(e);//->move方法中的this是window
            move.call(_this, e);
        };
        document.onmouseup = function (e) {
            up.call(_this, e);
        };
    }
}

function move(e) {
    e = e || window.event;
    var curL = (e.clientX - this["strX"]) + this["strL"];
    var curT = (e.clientY - this["strY"]) + this["strT"];

    //->边界判断
    // 判断临界值,跟据的是父级参照物
    var parent = this.parentNode;
    var minL = 0, minT = 0, maxL = parent.clientWidth - this.offsetWidth, maxT = parent.clientHeight - this.offsetHeight;
    curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
    curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
    this.style.left = curL + "px";
    this.style.top = curT + "px";
    run(this,'selfDrag')
}

function up(e) {
    if (this.releaseCapture) {
        this.releaseCapture();//->把当前的鼠标和#box这个盒子解除绑定
        this.onmousemove = null;
        this.onmouseup = null;
    } else {
        document.onmousemove = null;
        document.onmouseup = null;
    }
}