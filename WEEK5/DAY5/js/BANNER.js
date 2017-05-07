~function ($) {
    var bannerRender = (function () {
        //->bind data
        function bindData(url, $wrapper, $tip, callBack) {
            var fn = function (result) {
                var wrapperH = ``,
                    tipH = ``;
                $.each(result, function (index, item) {
                    wrapperH += `<div class="slider"><a href="${item.link}" target="_blank"><img src="" data-img="${item.img}" alt="${item.desc}"></a></div>`;

                    tipH += `<li class="${index === 0 ? 'cur' : (index === result.length - 1 ? 'last' : '')}"></li>`;
                });
                $wrapper.html(wrapperH);
                $tip.html(tipH);

                callBack && callBack(result);
            };
            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: fn
            });
        }

        //->lazy img
        function lazyImg($imgList) {
            $imgList.each(function () {
                $(this).attr('src', $(this).attr('data-img'))
                    .on('load', function () {
                        $(this).stop().fadeIn();
                    });
            });
        }

        //->auto move
        function autoMove($slider, $tipList, step, total) {
            step++;
            if (step >= total) {
                step = 0;
            }
            switchFn($slider, $tipList, step);
            return step;
        }

        //->switch
        function switchFn($slider, $tipList, step) {
            $slider.eq(step).css('zIndex', 1)
                .stop().animate({opacity: 1}, 500)
                .siblings().css('zIndex', 0)
                .stop().animate({opacity: 0}, 500);

            selectTip($tipList, step);
        }

        //->select tip
        function selectTip($tipList, step) {
            $tipList.each(function (index, item) {
                index === step ? $(item).addClass('cur') : $(item).removeClass('cur');
            });
        }

        //->tip and btn click
        function bindEvent(tip, btn, step, total, $slider, $tipList, computedStep) {
            $(this).click(function (e) {
                var tar = e.target,
                    $tar = $(tar),
                    tarTag = tar.tagName.toUpperCase(),
                    parent = tar.parentNode,
                    $parent = $(parent);

                //->TIP
                if (tarTag === 'LI' && $parent.hasClass('tip')) {
                    if (!tip) return;
                    step = $tar.index();
                    switchFn($slider, $tipList, step);
                    selectTip($tipList, step);
                    computedStep && computedStep(step);
                    return;
                }

                //->BTN LEFT
                if ($tar.hasClass('btnLeft')) {
                    if (!btn) return;
                    step--;
                    if (step < 0) {
                        step = total - 1;
                    }
                    switchFn($slider, $tipList, step);
                    selectTip($tipList, step);
                    computedStep && computedStep(step);
                    return;
                }

                //->BTN RIGHT
                if ($tar.hasClass('btnRight')) {
                    if (!btn) return;
                    step = autoMove($slider, $tipList, step, total);
                    computedStep && computedStep(step);
                }
            });
        }

        return {
            /*
             * option[object]：contains some of the parameters we need to configure
             *   autoInterval：Time frequency automatic switching carousel(The default value is 3000MS)
             *   url：The source of the data carousel figure you get(Mandatory)
             *   tip：Focus switch required(TRUE)
             *   switch：Whether or not to switch(TRUE)
             */
            init: function (option) {
                //->init parameter
                var _default = {
                    url: null,
                    autoInterval: 3000,
                    tip: true,
                    switch: true
                };
                $.each(option, function (key, value) {
                    _default[key] = value;
                });

                //->this:banner container
                var $wrapper = $(this).find('.wrapper'),
                    $tip = $(this).find('.tip');

                //->bind data
                var $slider, $imgList, $tipList, _this = this;
                var callback = function (result) {
                    //->bind end do something
                    $slider = $wrapper.find('.slider');
                    $imgList = $slider.find('img[data-img]');
                    $tipList = $tip.find('li');

                    //->lazy img
                    window.setTimeout(function () {
                        lazyImg($imgList);
                    }, 500);

                    //->auto move
                    var step = 0,
                        total = result.length,
                        autoTimer = null;
                    $slider.eq(step).css({
                        zIndex: 1,
                        opacity: 1
                    });
                    autoTimer = window.setInterval(function () {
                        step = autoMove($slider, $tipList, step, total);
                    }, _default.autoInterval);

                    //->stop or run
                    $(_this).mouseenter(function () {
                        window.clearInterval(autoTimer);
                    }).mouseleave(function () {
                        autoTimer = window.setInterval(function () {
                            step = autoMove($slider, $tipList, step, total);
                        }, _default.autoInterval);
                    });

                    //->tip && btn click
                    bindEvent.call(_this, _default.tip, _default.switch, step, total, $slider, $tipList, function (n) {
                        step = n;
                    });
                };
                bindData(_default.url, $wrapper, $tip, callback);
            }
        }
    })();
    $.fn.extend({banner: bannerRender.init});
}(jQuery);