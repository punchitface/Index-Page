$(function () {
    $('.link-down').on('click', function () {
        $.scrollTo('.slide-2', {duration: 1000, offset: 10});
        return false;
    });

    $(window).on('load', function () {
        $("#logo-wrap").animate({
            marginTop: -170
        }, {duration: 4000});
    });
    $('.slide-2').waypoint(function (direction) {
        if (direction == 'down' && !$('.slide-2 .steps').hasClass('complete')) {
            $('.slide-2 .steps').addClass('complete').find('.rollup').stop();
            $('.slide-2 .steps .step-1 .rollup').animate({
                marginTop: -192
            }, {duration: 800, complete: function () {
                $('.slide-2 .steps .step-2 .rollup').animate({
                    marginTop: -192
                }, {duration: 800, complete: function () {
                    $('.slide-2 .steps .step-3 .rollup').animate({
                        marginTop: -196
                    }, {duration: 800});
                }});
            }});
        }
    }, {offset: 100});

    $('.slide-3').waypoint(function (direction) {
        if (direction == 'up' && $('.slide-2 .steps').hasClass('complete')) {
            $('.slide-2 .steps').removeClass('complete').find('.rollup').stop();
            $('.slide-2 .steps .step-3 .rollup').animate({
                marginTop: 0
            }, {duration: 800, complete: function () {
                $('.slide-2 .steps .step-2 .rollup').animate({
                    marginTop: 0
                }, {duration: 800, complete: function () {
                    $('.slide-2 .steps .step-1 .rollup').animate({
                        marginTop: 0
                    }, {duration: 800});
                }});
            }});
        }
    }, {offset: $(window).height()});

    $(window).on('scroll', function () {
        var self = $(this);


        $('.slide-4 .features').each(function () {
            var features = $(this);
            if (self.scrollTop() + self.height() > features.offset().top + 100 && !features.hasClass('complete')) {
                var feature = features.find('.feature');
                feature.eq(0).addClass('active').animate({
                    opacity: 1
                }, {duration: 600, complete: function () {
                    feature.eq(1).addClass('active').animate({
                        opacity: 1
                    }, {duration: 600, complete: function () {
                        feature.eq(2).addClass('active').animate({
                            opacity: 1
                        }, {duration: 600, complete: function () {
                            features.addClass('complete')
                        }});
                    }});
                }});
            }
        });

        if ($('.slide-5').length && $(this).scrollTop() > $('.slide-5').offset().top - $(this).height()) {
            var scrollOffset = ($('.slide-5').offset().top - $(this).scrollTop()) / 1.5;
            $('.slide-5 .social-feedbacks').css({'margin-top': -scrollOffset});
        }
    });
    $('.fresh').popover({
        html: true,
        content: '<p>РџСЂРѕРёР·РІРµРґРµРЅРѕ Рё РґРѕСЃС‚Р°РІР»РµРЅРѕ РѕС‚ РґРІРµСЂРё РґРѕ РґРІРµСЂРё РїРѕ С‚РµС…РЅРѕР»РѕРіРёРё <img width="107" height="16" src="/images/logo-ca.png" alt="cool around" /> СЂР°Р·СЂР°Р±РѕС‚Р°РЅРЅРѕР№ РІ В«РџР°СЂС‚РёРё РµРґС‹В»</p>',
        placement: "right",
        trigger: "hover"
    });

    var hhead = $('#ha-header');
    hhead.addClass('ha-header-top').removeClass('ha-header-subshow');
    $('.ha-waypoint').each(function (i) {
        var el = $(this),
            animClassDown = el.data('animateDown'),
            animClassUp = el.data('animateUp');

        el.waypoint(function (direction) {
            if (direction === 'down' && animClassDown) {
                hhead.attr('class', 'ha-header ' + animClassDown);
            }
            else if (direction === 'up' && animClassUp) {
                hhead.attr('class', 'ha-header ' + animClassUp);
            }
        });
    });
});