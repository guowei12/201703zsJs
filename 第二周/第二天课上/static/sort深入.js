/**
 * Created by 39753 on 2017/4/11.
 */
var ary = [1,2,3,4,5,6]
ary.sort();//sort只能处理10以内的数字，不能处理10以外的数字
ary.sort(function (a,b) {
    console.log(a, b);// a当前项， b下一项
    return a - b;// 升序 如果a>b 返回大于0，a b交换位置
    return b - a;// 降序 如果b>a 返回小于0，a b交换位置
});// 这里边传的参数是回调函数
// 回调函数  把一个函数A当做实参，传递个给函数B，在B执行的时候，A再执行。
function fn (callBack) {
    callBack()
}
var aryNew = [
    {name:'赵煊1',age:11},
    {name:'美女2',age:12},
    {name:'帅哥3',age:13},
    {name:'啊哥3',age:23},
    {name:'啊妹4',age:14},
    {name:'丽媛5',age:15}
];
var theAry = aryNew.sort(function (a,b){
    return a.age - b.age
});
var theAry = aryNew.sort(function (a,b){
    return a.name.localeCompare(b.name)
});
var theAry = aryNew.sort(function (a,b){
    return 1;// 相当于数字的reverse，倒置数组
});
console.log(theAry);