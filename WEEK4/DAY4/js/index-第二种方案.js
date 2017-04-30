function autoMove() {
    //->方案二：首先都要把第一张克隆一份一模一样的放在末尾，开始步长累加运动，当我们STEP已经等于真实图片个数的时候，说明已经运动到克隆的这一张了，再次等待，当下一轮定时器执行的时候，STEP已经超过最长长度了，我们此时不着急运动，先让WRAPPER回到第一张的位置(回之前展示的是克隆的第一张，回到的依然是第一张，视觉差导致用户看不见回去的过程，也就是无缝衔接)，然后让STEP=1，这样在运动的时候就会运动到第二张...
    autoTimer = setInterval(function () {
        step++;
        if (step > total) {
            utils.css(wrapper, 'left', 0);
            step = 1;
        }
        zhufengAnimate(wrapper, {left: -step * 1000}, 500);
    }, autoInterval);
}
autoMove();