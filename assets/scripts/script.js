// const $ = require('jquery');



function findSliderActive() {
    let slider = $('.slider-content');
    let childs = slider.children();
    let activeElement = 0;

    childs.each(function (identifier) {
        if ($(this).hasClass('active')) {
            activeElement = identifier;
        }
    });

    return activeElement;
}

function removeClasses(identifier) {
    let slider = $('.slider-content');
    let childs = slider.children();

    childs.each(function (child_id) {
        if (child_id == identifier) {
            let active = ['active', 'active-moving-left', 'active-moving-right', 'was-big', 'inactive'];
            let next = ['next-item', 'next-item-moving-left', 'next-item-moving-right', 'inactive'];
            let onext = ['next-overflow-item', 'next-overflow-moving-left', 'next-overflow-moving-right', 'inactive'];
            let prev = ['prev-item', 'prev-item-moving-left',  'prev-item-moving-right', 'inactive'];
            let oprev = ['prev-overflow-item', 'prev-overflow-moving-left', 'prev-overflow-moving-right', 'inactive'];

            slider.children().eq(identifier).removeClass(active);
            let actualCount = childs.length - 1;

            if (identifier + 1 > actualCount) {
                slider.children().eq(identifier - actualCount).removeClass(next);
            } else {
                slider.children().eq(identifier + 1).removeClass(next);
            }

            if (identifier + 2 > actualCount) {
                slider.children().eq(identifier + 1 - actualCount).removeClass(onext);
            } else {
                slider.children().eq(identifier + 2).removeClass(onext);
            }

            if (identifier - 1 < 0) {
                slider.children().eq(identifier + actualCount).removeClass(prev);
            } else {
                slider.children().eq(identifier - 1).removeClass(prev);
            }

            if (identifier - 2 < 0) {
                slider.children().eq(identifier - 1 + actualCount).removeClass(oprev);
            } else {
                slider.children().eq(identifier - 2).removeClass(oprev);
            }
        }
    });

    $('.go-left').removeAttr('disabled');
    $('.go-right').removeAttr('disabled');
}

function setupSlider(identifier) {
    let slider = $('.slider-content');
    let childs = slider.children();

    if (identifier != undefined) {
        slider.children().eq(identifier).addClass('active');

        let actualCount = childs.length - 1;
        let slides = [];

        if (identifier + 1 > actualCount) {
            // slider.children().eq(identifier - actualCount).addClass('next-item');
        } else {
            slider.children().eq(identifier + 1).animate({
                order: 1,
            });
            slides.push(identifier + 1);
            // slider.children().eq(identifier + 1).addClass('next-item');
        }

        if (identifier + 2 > actualCount) {
            //slider.children().eq(identifier + 1 - actualCount).addClass('next-overflow-item');

        } else {
            slider.children().eq(identifier + 2).animate({
                order: 2,
            });
            slides.push(identifier + 2);

            // slider.children().eq(identifier + 2).addClass('next-overflow-item');
        }

        if (identifier - 1 < 0) {
            slider.children().eq(identifier + actualCount).animate({
                order: -1,
            });
            slides.push(identifier + actualCount);

            // slider.children().eq(identifier + actualCount).addClass('prev-item');
        } else {
            // slider.children().eq(identifier - 1).addClass('prev-item');
        }

        if (identifier - 2 < 0) {
            // slider.children().eq(identifier - 1 + actualCount).addClass('prev-overflow-item');
            slider.children().eq(identifier - 1 + actualCount).animate({
                order: -2,
            });
            slides.push(identifier - 1 + actualCount);

        } else {
            // slider.children().eq(identifier - 2).addClass('prev-overflow-item');
        }
        console.log(slides);
    }
}

function sliderMove(active, inc) {
    let slider = $('.slider-content');
    let childs = slider.children();

    let currentActive = findSliderActive();
    let newActive = currentActive + inc;

    if (newActive > childs.length - 1) {
        newActive = newActive - childs.length;
    }

    setTimeout(() => {
        setupSlider(newActive);
    },500);

    active.removeClass('active');

    setTimeout(() => {
        removeClasses(currentActive);
    },1000);
}

$('.go-left').on('click', function () {
    $(this).attr('disabled', 'true');

    let active = $('.active').addClass('active-moving-left');
    // $('.prev-item').addClass('prev-item-moving-left').removeClass('prev-item');
    // $('.next-item').addClass('next-item-moving-left').removeClass('next-item');
    // $('.prev-overflow-item').addClass('prev-overflow-moving-left').removeClass('prev-overflow-item');
    // $('.next-overflow-item').addClass('next-overflow-moving-left').removeClass('next-overflow-item');

    sliderMove(active,-1);
});


$('.go-right').on('click', function () {
    $(this).attr('disabled', 'true');

    let active = $('.active').addClass('active-moving-right');
    // $('.prev-item').addClass('prev-item-moving-right').removeClass('prev-item');
    // $('.next-item').addClass('next-item-moving-right').removeClass('next-item');
    // $('.prev-overflow-item').addClass('prev-overflow-moving-right').removeClass('prev-overflow-item');
    // $('.next-overflow-item').addClass('next-overflow-moving-right').removeClass('next-overflow-item');

    sliderMove(active,+1);
});


let currentActive = findSliderActive();
setupSlider(currentActive);