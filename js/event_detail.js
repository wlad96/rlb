var eventSlider = new Swiper('.eventSlider', {
    loop: true,
    speed: 900,
    // autoplay: {
    //     delay: 5000,
    //     pauseOnMouseEnter: true
    // },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.newsSlider__next',
        prevEl: '.newsSlider__prev'
    },
    mousewheel: false,
});

function showMore(btn) {
    const container = btn.closest('.eventDetailMain__left');

    container.querySelectorAll('.hide').forEach(el => {
        el.classList.add('show');
    });

    btn.closest('.read-more').remove();
}