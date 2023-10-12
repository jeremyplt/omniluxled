var hooxSliderReviews = document.querySelector(".hoox-reviews__slider-reviews");

if (hooxSliderReviews) {
  var slider = new Swiper(hooxSliderReviews, {
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    breakpoints: {
      767: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
    },
    pagination: {
      el: '.hoox-reviews__dots',
      clickable: true,
    },
    navigation: {
      nextEl: ".hoox-swiper-arrow-next",
      prevEl: ".hoox-swiper-arrow-prev",
    },
  });
}
