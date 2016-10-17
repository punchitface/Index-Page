/**
 * jquery.transitions.js
 * CSS3 Animations for Image Transitions
 * http://www.codrops.com
 *
 * Copyright 2011, Pedro Botelho / Codrops
 * Free to use under the MIT license.
 *
 * Date: Mon Dec 19 2011
 */
$(function() {

    var TransitionEffects = (function() {

        var $teWrapper = $('.te-wrapper'),
            currentImg = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            last_img = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            $navNext = $('.te-next'),
            $type = $('#type'),
            type = $type.val(),
            $teTransition = $teWrapper.find('.te-transition'),
        // requires perspective
            wPerspective = ['te-flip1', 'te-flip2', 'te-flip3', 'te-flip4',
                'te-rotation1', 'te-rotation2', 'te-rotation3', 'te-rotation4', 'te-rotation5', 'te-rotation6',
                'te-multiflip1', 'te-multiflip2', 'te-multiflip3',
                'te-cube1', 'te-cube2', 'te-cube3', 'te-cube4',
                'te-unfold1', 'te-unfold2'],
            animated = false,
        // check for support
            hasPerspective = Modernizr.csstransforms3d,
            init = function() {

                $teTransition.addClass(type);
                $navNext.on('click', function(event) {

                    if (hasPerspective && animated)
                        return false;

                    animated = true;
                    var wrapId = $navNext.index(this);
                    showNext(wrapId);
                    return false;

                });

                if (hasPerspective) {

                    $teWrapper.on({
                        'animationstart webkitAnimationStart oAnimationStart MSAnimationStart transitionstart webkitTransitionStart oTransitionStart MSTransitionStart': function(event) {

                            $type.prop('disabled', true);

                        },
                        'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd': function(event) {

                            var wrapId = $teWrapper.index(this);

                            if ((type === 'te-unfold1' && event.originalEvent.animationName !== 'unfold1_3Back') ||
                                (type === 'te-unfold2' && event.originalEvent.animationName !== 'unfold2_3Back'))
                                return false;

                            $teWrapper.eq(wrapId).find('div.te-cover').removeClass('te-hide');
                            if ($.inArray(type, wPerspective) !== -1)
                                $teWrapper.eq(wrapId).removeClass('te-perspective');
                            $teWrapper.eq(wrapId).find('.te-transition').removeClass('te-show');
                            animated = false;
                            $type.prop('disabled', false);

                        }
                    });

                }

                $type.on('change.TransitionEffects', function(event) {

                    type = $(this).val();
                    $teTransition.removeClass().addClass('te-transition').addClass(type);

                });

            },
            showNext = function(wrapId) {

                var $teCover = $teWrapper.eq(wrapId).find('div.te-cover'),
                    $teTransition = $teWrapper.eq(wrapId).find('.te-transition');

                if (hasPerspective) {

                    $teTransition.addClass('te-show');
                    $teCover.addClass('te-hide');
                    if ($.inArray(type, wPerspective) !== -1) {

                        $teWrapper.eq(wrapId).addClass('te-perspective');

                    }

                }

                updateImages(wrapId);
                $.browser = {};
                $.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
                //not webkit
                if (!$.browser.webkit) {
                    $teCover.removeClass('te-hide');
                    if ($.inArray(type, wPerspective) !== -1)
                        $teWrapper.eq(wrapId).removeClass('te-perspective');
                    $teTransition.removeClass('te-show');
                    animated = false;
                }

            },
            updateImages = function(wrapId) {

                var $teCover = $teWrapper.eq(wrapId).find('div.te-cover'),
                    $teTransition = $teWrapper.eq(wrapId).find('.te-transition'),
                    $teImages = $teWrapper.eq(wrapId).find('div.te-images > img'),
                    imagesCount = $teImages.length;

                var $back = $teTransition.find('div.te-back'),
                    $front = $teTransition.find('div.te-front');

                (currentImg[wrapId] === imagesCount - 1) ?
                    (last_img[wrapId] = imagesCount - 1, currentImg[wrapId] = 0) :
                    (last_img[wrapId] = currentImg[wrapId], ++currentImg[wrapId]);
                var $last_img = $teImages.eq(last_img[wrapId]),
                    $currentImg = $teImages.eq(currentImg[wrapId]);

                $front.empty().append('<img src="' + $last_img.attr('src') + '">');
                $back.empty().append('<img src="' + $currentImg.attr('src') + '">');

                $teCover.find('img').attr('src', $currentImg.attr('src'));

            };

        return {init: init};

    })();

    TransitionEffects.init();

});