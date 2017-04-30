function autoMove() {
    //->运动到第五张(克隆的),刚运动完成,我立马让其回到第一张(利用视距差:第五张和第一张一模一样)实现了衔接
    autoTimer = setInterval(function () {
        step++;
        zhufengAnimate(wrapper, {left: -step * 1000}, 500, function () {
            if (step === total) {
                step = 0;
                utils.css(this, 'left', 0);
            }
        });
    }, autoInterval);
}
autoMove();