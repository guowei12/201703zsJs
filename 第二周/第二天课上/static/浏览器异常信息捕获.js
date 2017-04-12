/**
 * Created by 39753 on 2017/4/11.
 */
try {
    console.log(num)
}catch (e) { // 形参必须写，形参名字 自己定义，一般起名e
    console.log('出错了');
    console.log(e.message);// e.message 收集当前代码报错的原因
    throw new Error('你长得太丑了，不准打开此页面')
}finally {
    console.log('不管是否报错都要执行这里'); // 一般不使用
}