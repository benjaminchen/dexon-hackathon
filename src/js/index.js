$(document).ready(function() {
    $('.slick-list').slick({
        lazyLoad: 'ondemand',
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
    });
});