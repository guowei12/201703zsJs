$(document).ready(function () {
    var $container = $('.container'),
        $wrapper = $container.find('.wrapper'),
        $tip = $container.find('.tip');

    //->GET DATA
    var resultData = null,
        wrapperHTML = ``,
        tipHTML = ``;
    $.ajax({
        url: 'json/banner.json',
        method: 'GET',
        async: false,
        dataType: 'json',
        success: function (result) {
            resultData = result;
        }
    });
    $.each(resultData, function (index, item) {
        wrapperHTML += `<div class="slider"><a href="${item.link}" target="_blank"><img src="" data-img="${item.img}" alt="${item.desc}"></a></div>`;

        tipHTML += `<li class="${index === 0 ? 'cur' : (index === resultData.length - 1 ? 'last' : '')}"></li>`;
    });
    $wrapper.html(wrapperHTML);
    $tip.html(tipHTML);

    //->LAZY IMG
    var $slider = $wrapper.find('.slider'),
        $imgList = $slider.find('img[data-img]'),
        $tipList = $tip.find('li'),
        $btnLeft = $container.find('.btnLeft'),
        $btnRight = $container.find('.btnRight');
    $imgList.each(function () {
        $(this).attr('src', $(this).attr('data-img'))
            .on('load', function () {
                $(this).stop().fadeIn();
            });
    });

    //->AUTO MOVE
    var autoTimer = null,
        autoInterval = 1000,
        step = 0,
        total = $slider.length;
    $slider.eq(step).css({
        opacity: 1,
        zIndex: 1
    });
    autoTimer = window.setInterval(autoMove, autoInterval);

    //->STOP OR RUN
    $container.mouseenter(function () {
        window.clearInterval(autoTimer);
    }).mouseleave(function () {
        autoTimer = window.setInterval(autoMove, autoInterval);
    });

    //->TIP && BTN CLICK
    $container.click(function (e) {
        var tar = e.target,
            $tar = $(tar),
            tarTag = tar.tagName.toUpperCase(),
            parent = tar.parentNode,
            $parent = $(parent);

        //->TIP
        if (tarTag === 'LI' && $parent.hasClass('tip')) {
            step = $tar.index();
            $slider.eq(step).css('zIndex', 1)
                .stop().animate({opacity: 1}, 500)
                .siblings().css('zIndex', 0)
                .stop().animate({opacity: 0}, 500);
            selectTip();
            return;
        }

        //->BTN LEFT
        if ($tar.hasClass('btnLeft')) {
            step--;
            if (step < 0) {
                step = total - 1;
            }
            $slider.eq(step).css('zIndex', 1)
                .stop().animate({opacity: 1}, 500)
                .siblings().css('zIndex', 0)
                .stop().animate({opacity: 0}, 500);
            selectTip();
            return;
        }

        //->BTN RIGHT
        if ($tar.hasClass('btnRight')) {
            autoMove();
        }
    });

    //->AUTO MOVE
    function autoMove() {
        step++;
        if (step >= total) {
            step = 0;
        }
        $slider.eq(step).css('zIndex', 1)
            .stop().animate({opacity: 1}, 500)
            .siblings().css('zIndex', 0)
            .stop().animate({opacity: 0}, 500);
        selectTip();
    }

    //->SELECT TIP
    function selectTip() {
        $tipList.each(function (index, item) {
            index === step ? $(item).addClass('cur') : $(item).removeClass('cur');
        });
    }
});