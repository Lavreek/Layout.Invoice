
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
            let next = ['next', 'next-item-moving-left', 'next-item-moving-right', 'inactive'];
            let onext = ['nof', 'next-overflow-moving-left', 'next-overflow-moving-right', 'inactive'];
            let prev = ['prev', 'prev-item-moving-left',  'prev-item-moving-right', 'inactive'];
            let oprev = ['pof', 'prev-overflow-moving-left', 'prev-overflow-moving-right', 'inactive'];

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
        let slides = [identifier];

        if (identifier + 1 > actualCount) {
            slider.children().eq(identifier - actualCount).addClass('next');
            slides.push(identifier - actualCount);

        } else {
            slider.children().eq(identifier + 1).addClass('next');
            slides.push(identifier + 1);
        }

        if (identifier + 2 > actualCount) {
            slider.children().eq(identifier + 1 - actualCount).addClass('nof');
            slides.push(identifier + 1 - actualCount);

        } else {
            slider.children().eq(identifier + 2).addClass('nof');
            slides.push(identifier + 2);
        }

        if (identifier - 1 < 0) {
            slider.children().eq(identifier + actualCount).addClass('prev');
            slides.push(identifier + actualCount);
        } else {
            slider.children().eq(identifier - 1).addClass('prev');
            slides.push(identifier - 1);
        }

        if (identifier - 2 < 0) {
            slider.children().eq(identifier - 1 + actualCount).addClass('pof');
            slides.push(identifier - 1 + actualCount);

        } else {
            slider.children().eq(identifier - 2).addClass('pof');
            slides.push(identifier - 2);
        }

        childs.each(function (identifier) {
            let element = slides.find(elem => elem === identifier);

            if (element === undefined) {
                slider.children().eq(identifier).addClass('inactive');
            }
        });
    }
}

function sliderMoveLeft(slider, childs, btn) {
    let newActive = undefined;
    let actualCount = childs.length - 1;

    childs.each(function (child_id) {
        if (slider.children().eq(child_id).hasClass('nof')) {
            slider.children().eq(child_id).addClass('inactive').removeClass(['nof', 'nof-l-moving']);
        }

        if (slider.children().eq(child_id).hasClass('next')) {
            slider.children().eq(child_id).addClass('nof').removeClass(['next', 'next-l-moving']);
        }

        if (slider.children().eq(child_id).hasClass('active')) {
            slider.children().eq(child_id).addClass('next').removeClass(['active', 'active-l-moving']);
        }

        if (slider.children().eq(child_id).hasClass('prev')) {
            slider.children().eq(child_id).addClass('active').removeClass(['prev', 'prev-l-moving']);
            newActive = child_id;
        }

        if (slider.children().eq(child_id).hasClass('pof')) {
            slider.children().eq(child_id).addClass('prev').removeClass(['pof', 'pof-l-moving']);
        }
    });

    let newPof = undefined;

    if (newActive - 2 < 0) {
        newPof = newActive - 1 + actualCount;
    } else {
        newPof = newActive - 2;
    }

    slider.children().eq(newPof).addClass('pof').removeClass('inactive');

    btn.removeAttr('disabled');
}

function sliderMoveRight(slider, childs, btn) {
    let newActive = undefined;
    let actualCount = childs.length - 1;

    childs.each(function (child_id) {
        if (slider.children().eq(child_id).hasClass('pof')) {
            slider.children().eq(child_id).addClass('inactive').removeClass(['pof', 'pof-r-moving']);
        }

        if (slider.children().eq(child_id).hasClass('prev')) {
            slider.children().eq(child_id).addClass('pof').removeClass(['prev', 'prev-r-moving']);
        }

        if (slider.children().eq(child_id).hasClass('active')) {
            slider.children().eq(child_id).addClass('prev').removeClass(['active', 'active-r-moving']);
        }

        if (slider.children().eq(child_id).hasClass('next')) {
            slider.children().eq(child_id).addClass('active').removeClass(['next', 'next-r-moving']);
            newActive = child_id;
        }

        if (slider.children().eq(child_id).hasClass('nof')) {
            slider.children().eq(child_id).addClass('next').removeClass(['nof', 'nof-r-moving']);
        }
    });

    let newPof = undefined;

    if (newActive + 2 > actualCount) {
        newPof = newActive + 1 - actualCount;
    } else {
        newPof = newActive + 2;
    }

    slider.children().eq(newPof).addClass('nof').removeClass('inactive');
    btn.removeAttr('disabled');
}

function sliderMove(inc) {
    let slider = $('.slider-content');
    let childs = slider.children();

    let currentActive = findSliderActive();
    let newActive = currentActive + inc;

    if (newActive > childs.length - 1) {
        newActive = newActive - childs.length;
    }

    setTimeout(() => {
        switch (inc) {
            case 1:
                sliderMoveRight(slider, childs, $('.go-right'));
                break;

            case -1:
                sliderMoveLeft(slider, childs, $('.go-left'));
                break;
        }
    }, 250);
}

$('.go-left').on('click', function () {
    $(this).attr('disabled', 'true');

    $('.active').addClass('active-l-moving');
    $('.prev').addClass('prev-l-moving');
    $('.next').addClass('next-l-moving');
    $('.pof').addClass('pof-l-moving');
    $('.nof').addClass('nof-l-moving');

    sliderMove(-1);
});

$('.go-right').on('click', function () {
    $(this).attr('disabled', 'true');

    $('.active').addClass('active-r-moving');
    $('.prev').addClass('prev-r-moving');
    $('.next').addClass('next-r-moving');
    $('.pof').addClass('pof-r-moving');
    $('.nof').addClass('nof-r-moving');

    sliderMove(+1);
});

let currentActive = findSliderActive();
setupSlider(currentActive);