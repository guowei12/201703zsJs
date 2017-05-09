$('.tab>.tip>li').mouseover(function () {
    var curIndex = $(this).index();
    // $(this).addClass('cur').siblings().removeClass('cur')
    //     .parent().siblings('.contain')
    //     .eq(curIndex).addClass('cur')
    //     .siblings().removeClass('cur');

    $(this).addClass('cur').siblings().removeClass('cur')
        .parent().siblings('.contain')
        .each(function (index, item) {
            //->this:item
            curIndex === index ? $(this).addClass('cur') : $(this).removeClass('cur');
        });
});