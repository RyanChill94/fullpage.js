/**
 * Created by Ryanchill on 2016/3/15.
 */
$(function () {
    var animateTime = 1000,
        $group = $('.section-group'),
        $sections = $group.find('>section'),
        $sectionCount = $sections.length,
        html = ['<ul class = "pagination">'],
        flag = false;

    /*当前所在的页标*/
    $group.data('index_flag', 0);
    $sections.first().addClass('active');


    /*初始化页码*/
    for (var i = 0; i < $sectionCount; i++) {
        var item = $sections.eq(i),
            title = item.data('title');
        console.log(title);
        html.push('<li><span>' + title + '</span></li>');
    }
    html.push('</ul>');

    var $pagination = $(html.join(''));
    var $paginations = $pagination.find('>li');

    //console.log($paginations);

    $pagination.appendTo($('body'))
        .css('margin-top', '-' + $pagination.height() / 2 + 'px');

    $paginations.click(function () {
        /*如果动画正在进行，则不再继续*/
        if (flag) return;
        var $this = $(this), /*将所点击的按钮元素赋值给变量*/
            index = $this.index(),
            translateY = index * 100,
            l_index = $group.data('index_flag'),
            $section = $sections.eq(index);

        if(index == l_index){
            return;
        }

        flag = true;
        $paginations.removeClass('active');
        $this.addClass('active');
        $sections.removeClass('active');
        $section.addClass('active');
        $group.data('index_flag', index)  /*储存当前页标*/
            .css({
                '-webkit-transform': 'translateY(-' + translateY + '%)',
                'transform': 'translateY(-' + translateY + '%)'
            });
        setTimeout(function () {
            flag = false;
        }, animateTime);
    }).first().addClass('active');

    /*滚轮事件入口*/
    function wheelEvent(delta) {
        if (flag) {
            return;
        }
        /*改变分页索引值*/
        delta = delta > 0 ? 1 : -1;
        //console.log(delta);
        var index = $group.data('index_flag');
        index -= delta;
        /*边界检验*/
        if (index < 0) {
            index = 0;
        }
        if (index > ($sectionCount - 1)) {
            index = $sectionCount - 1;
        }

        /*触发页码点击事件*/
        $paginations.eq(index).click();

    }


    /*绑定滚轮事件*/
    $(document).bind('mousewheel', function (event, delta) {
        //console.log('监听到滚轮事件');
        wheelEvent(delta);
    });
});