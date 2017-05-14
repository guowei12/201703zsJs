/*
 * ES6中的类
 */
class Fn {
    //->private property
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    //->public property：Fn.prototype.eat
    eat() {

    }

    drink() {

    }

    //->static property：Fn.say
    static say() {

    }
}
// //console.dir(Fn);
// let f1 = new Fn('张三', 25);
// console.dir(f1);

/*
 * ES6中类的继承(寄生组合式继承)
 */
class MengMeng extends Fn {
    constructor(name, age, sex) {//->MengMeng
        super(name, age);//->extend parent class private property [call]
        this.sex = sex;
    }

    //->extend parent class public property [prototype]
    smoke() {

    }

    //->no extend parent class static property
}
console.dir(MengMeng);