/**
 * Created by 39753 on 2017/4/11.
 */
function toAry (n1, n2, n3, n4, n5) {
   var ary = [].slice.call(arguments);
    var aryTwo = Array.prototype.slice.call(arguments);
    console.log(ary,aryTwo);
} // IE 6-8不兼容


toAry(1,2,3,4,5);
// 兼容写法
function  toA (obj) {
    var ary = [];
    for (var i=0; i<ary.length;i++) {
        ary[ary.length] = obj[i]
    }
    return ary;
}
toA()