/*
 * 真实项目中的选项卡处理起来比我们的DEMO要麻烦一些
 *  ->我们每一个页卡中的详细内容不一定是写死的，大部分都是从服务器端动态获取绑定的
 *  =>第一种：发送一次请求，服务器端会把所有页卡的内容返回给客户端，客户端根据内容分类，把不同的内容放在不同的页卡中(一次性把个个页卡内容都绑定了)
 *    '{
 *       "history":[
 *          {"id":1,"title":"xxx"...},
 *          ...
 *       ],
 *       "read":[...]
 *    }'
 *
 *  =>第二种：加载页面的时候，只把第一个页卡中的内容获取到，当我们操作其它页卡的时候，在重新向服务发送请求，把对应的页卡内容获取到；如果当前页卡信息已经获取过了，再次操作的时候不要重新的获取。
 *   回去模拟：有几个页卡准备几个JSON文件，然后操作的时候使用AJAX获取
 */

//->基于JQ扩展选项卡插件
$.fn.extend({
    changeTab: function (index, type) {
        //->this:current tab
        index = index || 0;
        type = type || 'click';

        console.log(this);

        var $list = $(this).find('.tip>li'),
            $contain = $(this).find('.contain');

        //->select default
        $list.removeClass('cur').eq(index).addClass('cur');
        $contain.removeClass('cur').eq(index).addClass('cur');

        //->click
        var preIndex = index;
        $(this).on(type, function (e) {
            var tar = e.target,
                $tar = $(tar),
                tarTag = tar.tagName.toUpperCase();

            //->TARGET IS TAB
            if (tarTag === 'LI' && $tar.parent().hasClass('tip')) {
                //->REMOVE
                $list.eq(preIndex).removeClass('cur');
                $contain.eq(preIndex).removeClass('cur');

                //->ADD
                var curIndex = $tar.index();
                $tar.addClass('cur');
                $contain.eq(curIndex).addClass('cur');
                preIndex = curIndex;
            }
        });
    }
});
// $('#tab1').changeTab(0, 'mouseover');
// $('#tab2').changeTab(2);
$('.tab').each(function () {
    $(this).changeTab();
});


// var $tab = $('.tab'),
//     $list = $tab.find('.tip>li'),
//     $contain = $tab.find('.contain');
// $tab.attr('data-preIndex', 0)
//     .on('click', function (e) {
//         var tar = e.target,
//             $tar = $(tar),
//             tarTag = tar.tagName.toUpperCase();
//
//         //->TARGET IS TAB
//         if (tarTag === 'LI' && $tar.parent().hasClass('tip')) {
//             //->REMOVE
//             var dataPreIndex = $(this).attr('data-preIndex');
//             $list.eq(dataPreIndex).removeClass('cur');
//             $contain.eq(dataPreIndex).removeClass('cur');
//
//             //->ADD
//             var curIndex = $tar.index();
//             $tar.addClass('cur');
//             $contain.eq(curIndex).addClass('cur');
//             $(this).attr('data-preIndex', curIndex);
//         }
//     });



















