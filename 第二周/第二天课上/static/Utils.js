/**
 * Created by 39753 on 2017/4/11.
 */
function listToArray (obj) {
    var ary = [];
    try {
        ary = Array.prototype.slice.call(obj)
    }catch (e) {
        for (var i=0; i<obj.length;i++) {
            ary[ary.length] = obj[i]
        }
    }
    return ary;
}
function JSONParse (str) {
    var val;
    try {
        val = JSONParse(str)
    }catch (e){
        val = eval("("+str+")");
    }
    return val;
    return JSON in window ? JSONParse(str):eval("("+str+")");
}