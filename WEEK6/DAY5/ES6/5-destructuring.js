// let ary = ['吴长闯', '赵少鹏', '王雪', '李俊杰'];
//->LOWEST
// let a = ary[0];
// let b = ary[1];
// let c = ary[2];
// let d = ary[3];

// let [a,b,c,d]=ary;
// console.log(a, b, c, d);

// let [a,,,b]=ary;
// console.log(a, b);

// let ary = ['吴长闯', '赵少鹏', ['王雪', '李俊杰']];
// let [,,[,a]]=ary;
// console.log(a);

//=======================================
let obj = {
    a: 1,
    b: [12, 23, [34, 45]],
    c(){
        console.log(3);
    }
};

// let {x, y, z}=obj;
// console.log(x, y, z);//->undefined undefined undefined =>obj.x/obj.y/obj.z

// let {a, b, c}=obj;//->对象的解构赋值需要保证变量名和属性名一致才可以获取对应位置的值(默认情况下)
// console.log(a, b, c);

// let {a:x, b:y, c:z}=obj;//->相当于在给原有的属性名设置别名
// console.log(x, y, z);

// let {a, b:[,,[,h]], c}=obj;
// console.log(h);

// let {b:[,,[,h]]}=obj;
// console.log(h);






