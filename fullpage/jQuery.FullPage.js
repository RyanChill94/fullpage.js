/**
 * Created by Ryanchill on 2016/3/16.
 */
(function ($) {
    /*���캯��*/
    var FullPage = function (elemClassName,options) {
        this.$group = $(elemClassName);
        this.$sections = this.$group.find('>section'); /*��ͬ��ҳ*/
        this.$sectionCount = this.$sections.length;
        this.mFlag = false;
        /*ʹ��$.extend(defaults,options)��Ĭ��ֵ�ʹ���Ĳ������кϲ�*/
        this.options = $.extend({}, FullPage.DEFAULTS, options);
        this.init();
        this.event();
    };

    /*Ĭ�ϲ������*/
    FullPage.DEFAULTS = {
        "animateTime": 1000
    };

    /*��ʼ������*/
    FullPage.prototype.init = function () {
        var $group = this.$group,
            $sections = this.$sections,
            html = ['<ul class ="pagination">'];
        /*��ǰ��index��ʼ��*/
        $group.data('index_flag', 0);
        $sections.first().addClass('active');

        /*��̬����ѡ���ǩ��*/
        for (var i = 0; i < this.$sectionCount; i++) {
            var item = $sections.eq(i),
                title = item.data('title');
            html.push('<li><span>' + (title ? title : '') + '</span></li>');
        }
        html.push('</ul>');
        this.$pagination = $(html.join(''));
        this.$paginations = this.$pagination.find('>li');
        /*��ֱ����*/
        this.$pagination.appendTo($('body')).css('margin-top', '-' + this.$pagination.height() / 2 + 'px');


    };

    FullPage.prototype.event = function () {
        var $paginations = this.$paginations,
            $sections = this.$sections,
            animateTime = this.options.animateTime,
            that = this;
        /*����¼��ı��������� thisָ�򴥷�click�¼���Ԫ��*/
        $paginations.click(function () {
            var $this = $(this),
                index = $this.index(),
                translateY = index * 100,
                last_index = that.$group.data('index_flag'),
                $section = $sections.eq(index),
                $last_section = $sections.eq(last_index);
            //����ϴα任��û����
            if (that.mFlag) {
                return false;
            }
            //���ѡ�а�ťΪ��ǰҳ���򲻷����任
            if (index == last_index) {
                return false;
            }
            /*����*/
            that.mflag = true;

            /*�Զ����¼���*/
            var le = $.Event('beforeHidden.from.fullpage', {item: $last_section});
            that.$group.trigger(le);
            var e = $.Event('beforeShow.from.fullpage', {item: $section});
            that.$group.trigger(e);

            $paginations.removeClass('active');
            $this.addClass('active');

            that.$group.data('index_flag', index).css({
                'transform': 'translateY(-' + translateY + '%)',
                '-webkit-transform': 'translateY(-' + translateY + '%)'
            });
            setTimeout(function () {
                var le = $.Event('afterHidden.from.fullpage', {item: $l_section});
                that.$group.trigger(le);
                var e = $.Event('afterShow.from.fullpage', {item: $section});
                that.$group.trigger(e);
                that.mFlag = false;
            }, animateTime);

        }).first().addClass('active');

        this.$group.bind('mousewheel', function (event, delta) {
            that.wheelEvent(delta);
        })
    };

    FullPage.prototype.wheelEvent = function (delta) {
        if (this.mflag) {
            return;
        }
        delta = delta > 0 ? 1 : -1;
        var index = this.$group.data('index_flag') ? this.$group.data('index_flag') : 0;
        index = index - delta;
        index = index < 0 ? 0 : (index > (this.$sectionCount - 1)) ? (this.$sectionCount - 1) : index;
        this.$paginations.eq(index).click();
    };

    var old = $.fn.fullpage;
    $.fn.fullPage = function (option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('form.fullPage');
            /*geek д�� �׶��Խϲ�*/
            var options = typeof option == 'object' && option;

            /**/
            if (!data) {
                /*��ʵ�������ݱ��浽��ǰ��ʵ����������*/
                $this.data('form.fullPage', (data = new FullPage(this, options)));
                //console.log($this.data('form.fullPage'));
            }
            /**/
            if (typeof option == 'string') {
                data[option].call($this);
            }

        });
    };

    /**/
    $.fn.fullPage.Constructor = FullPage;

    /**/
    $.fn.fullPage.noConflict = function () {
        $.fn.fullpage = old;
        return this;
    }


})
(jQuery);

