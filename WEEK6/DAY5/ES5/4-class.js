"use strict";

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/*
 * ES6中的类
 */
var Fn = function () {
    //->private property
    function Fn(name, age) {
        _classCallCheck(this, Fn);

        this.name = name;
        this.age = age;
    }

    //->public property：Fn.prototype.eat


    _createClass(Fn, [{
        key: "eat",
        value: function eat() {
        }
    }, {
        key: "drink",
        value: function drink() {
        }

        //->static property：Fn.say

    }], [{
        key: "say",
        value: function say() {
        }
    }]);

    return Fn;
}();
// //console.dir(Fn);
// let f1 = new Fn('张三', 25);
// console.dir(f1);

/*
 * ES6中类的继承(寄生组合式继承)
 */


var MengMeng = function (_Fn) {
    _inherits(MengMeng, _Fn);

    function MengMeng(name, age, sex) {
        _classCallCheck(this, MengMeng);

        //->extend parent class private property [call]
        var _this = _possibleConstructorReturn(this, (MengMeng.__proto__ || Object.getPrototypeOf(MengMeng)).call(this, name, age)); //->MengMeng


        _this.sex = sex;
        return _this;
    }

    //->extend parent class public property [prototype]


    _createClass(MengMeng, [{
        key: "smoke",
        value: function smoke() {
        }

        //->no extend parent class static property

    }]);

    return MengMeng;
}(Fn);

console.dir(MengMeng);