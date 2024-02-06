var hooxSliderReviews1 = document.querySelector(".hoox-how-to__items");

if (hooxSliderReviews1) {
  var slider1 = new Swiper(hooxSliderReviews1, {
    loop: true,
    centeredSlides: false,
    breakpoints: {
      600: {
        slidesPerView: 1.25,
        slidesPerGroup: 1.25,
      },
      767: {
        slidesPerView: 4,
        slidesPerGroup: 4,
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
