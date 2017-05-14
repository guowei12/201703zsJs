(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Weil on 16/3/24.
 */

'use strict';

var _mathUtils = require('./mathUtils');

//import * as Utils from './mathUtils'
//import Utils from './mathUtils'

//console.log(Utils.add(1, 2), Utils.MyName);
console.log((0, _mathUtils.add)(1, 2), _mathUtils.MyName);
console.log(123);

},{"./mathUtils":2}],2:[function(require,module,exports){
/**
 * Created by Weil on 16/3/24.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var MyName = 'Utils';

var add = function add(x, y) {
  return x + y;
};

exports.add = add;
exports.MyName = MyName;

//export default {add, MyName};

},{}]},{},[1]);
