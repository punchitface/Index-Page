$(function () {
    $(document).on('click', '.tab-pane .nav-days .menu-days li a', function (e) {

        if (!$(this).parent().hasClass('disabled')) {
            var mThumbs = $('.tab-pane.active .nav-days .menu-days li');
            var mRecipes = $('.tab-pane.active .list-view .list-unstyled li');
            pos = $(this).parents('li').index();
            mRecipes.filter('.active').fadeOut(400, function () {
                $(this).removeClass('active');
                mRecipes.eq(pos).fadeIn(400).addClass('active');
            });
            mThumbs.removeClass('active').eq(pos).addClass('active');
        }
        return false;
    });

    $('.slide-3').waypoint(function (direction) {
        if (direction === 'down' && !$('.slide-3 .tab-pane.active').hasClass('complete')) {
            $('.slide-3 .tab-pane.active').addClass('complete').find('.recipe.active .te-next').click();
        }
    }, {offset: 200});

    $('input[name=dinners]').on('change', function () {
        var count = $('input[name=dinners]:checked').val();
        $('.menu-days').each(function () {
            var days = $(this).children('li');
            days.removeClass('disabled active').filter(':lt(' + (5 - count) + ')').addClass('disabled');
            days.filter(':not(.disabled):first').find('a').tab('show');
        });
        $('.menu-days > li:not(.disabled):first a').click();
//            var idx = $('.menu-days > li.active').index();
//            $('.tab-pane .recipe').removeClass('active').filter(':eq('+idx+')').addClass('active');
    });
});