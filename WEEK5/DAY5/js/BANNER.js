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
        wrapperHTML += `<div class="${index === 0 ? 'slider cur' : 'slider'}"><a href="${item.link}" target="_blank"><img src="" data-img="${item.img}" alt="${item.desc}"></a></div>`;

        tipHTML += `<li class="${index === 0 ? 'cur' : (index === resultData.length - 1 ? 'last' : '')}"></li>`;
    });
    $wrapper.html(wrapperHTML);
    $tip.html(tipHTML);

    //->LAZY IMG
    var $slider = $wrapper.find('.slider'),
        $imgList = $slider.find('img[data-img]');
    $imgList.each(function () {
        $(this).attr('src', $(this).attr('data-img'))
            .on('load', function () {
                $(this).stop().fadeIn();
            });
    });


});