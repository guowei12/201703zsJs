$(function () {
    var $small = $('.small'),
        $mark = $small.find('.mark'),
        $big = $('.big'),
        $bigImg = $big.find('img');
    var markW, markH, boxL, boxT, minL = 0, minT = 0, maxT, maxL;

    //->COMPUTED POSITION
    function fn(e) {
        //->get some box style information for the first time
        if (!markW) {
            var boxObj = $(this).offset();
            boxL = boxObj.left;
            boxT = boxObj.top;
            markW = $mark.outerWidth();
            markH = $mark.outerHeight();
            maxL = $(this).outerWidth() - markW;
            maxT = $(this).outerHeight() - markH;
        }

        //->get mark top/left, and then do the boundary processing
        var curL = e.pageX - boxL - markW / 2,
            curT = e.pageY - boxT - markH / 2;
        curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
        curT = curT < minT ? minT : (curT > maxT ? maxT : curT);

        //->set mark style
        $mark.css({
            top: curT,
            left: curL
        });

        //->control right
        $big.css('display', 'block');
        $bigImg.css({
            top: -curT * 3,
            left: -curL * 3
        });
    }

    $small.on({
        mouseenter: function (e) {
            $mark.css('display', 'block');
            fn.call(this, e);
        },
        mousemove: fn,
        mouseleave: function (e) {
            $mark.css('display', 'none');
            $big.css('display', 'none');
        }
    });
});