"use strict";

var _loop = function _loop(i) {
    window.setTimeout(function () {
        console.log(i);
    }, 0);
};

for (var i = 0; i < 5; i++) {
    _loop(i);
}