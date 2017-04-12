/**
 * Created by 39753 on 2017/4/12.
 */
// 什么是JSON数据类型
// JSON数据类型跟我们的对象和数组很相似
// 普通对象
var obj = {
    name: 'heihei',
    age: '12'
};
//JSON对象  属性名必须用‘’双引号包含起来
var objJson = {
    'name': 'heihei',
    'age': 13
};
var str = ' {"name": "heihei","age": "12"}'
var obj = {"name": "heihei","age": "12"}
JSON.parse(str).log//将JSON格式字符串，转化成JSON格式对象
JSON.stringify(obj).log//将JSON格式对象，转化成JSON格式字符串