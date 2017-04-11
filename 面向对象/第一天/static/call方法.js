/**
 * Created by 39753 on 2017/4/11.
 */

// call方法   首先让调用对象执行，然后第一参数是谁。调用对象中的this就改变，指向是谁。后边传参数，依次对应传入。
// apply 方法 首先让调用对象执行，然后第一参数是谁。调用对象的this就改变指向是谁，后边跟参数，以数组的形式传入
var per = '泽鑫';
var age = 30;
function  a (n,age) {
    this.per = n;
    this.age = age;
    this.num = '110'
}
var b = {
    per: 1,
    age: 12
};
//a.call(b,'laoshi','还年轻');
a.apply(b,['a','c']);
console.log(b);
console.log(b.per, b.age);






 //a('wenxin', 16);// this -->window
//console.log(per);
//console.log(age);
//a.call(b,'laoshi','还年轻');// this --- b, a方法里边处理的就是b了
//console.log(b);

//var b = {
//    per: '13'
//};
//a.call(b,'改变', 20);
//console.log(b.per);
//console.log(b.age);
//console.log(b.num);
//console.log(b.per);
//
//console.log(b.per, b.age);
//
