
//->拖拽的原理：
//当鼠标在盒子上按下的时候，我们开始拖拽(给盒子绑定onmousemove和onmouseup)
//当鼠标移动的时候，我们计算盒子的最新位置
//当鼠标抬起的时候说明拖拽已经结束了，我们的move和up就没用了，我们在把这两个方法移除
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
    var parent = this.parentNode;
    //->边界判断
    var minL = 0, minT = 0, maxL = parent.clientWidth - this.offsetWidth, maxT = parent.clientHeight - this.offsetHeight;
    curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
    curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
    this.style.left = curL + "px";
    this.style.top = curT + "px";
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



//->当鼠标移动过快的时候，我们的鼠标会脱离盒子，导致盒子的mouseup和mousemove事件都移除不到->"鼠标焦点丢失"
//在IE和火狐浏览器中，我们用一个方法把盒子和鼠标绑定在一起即可-> this.setCapture()

//但是这个方法在谷歌下不兼容：Uncaught TypeError: this.setCapture is not a function
//->鼠标在快也跑不出去文档：我们把mousemove/mouseup绑定给document