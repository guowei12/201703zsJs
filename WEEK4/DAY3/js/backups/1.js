bk:for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        if (i === 1 && j === 1) {
            break bk;
        } else {
            console.log("i:" + i + "--j:" + j);
        }
    }
}