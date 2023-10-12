var hooxSliderReviews1 = document.querySelector(".hoox-reviews__slider-reviews");

if (hooxSliderReviews1) {
  var slider1 = new Swiper(hooxSliderReviews1, {
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

var hooxSliderReviews2 = document.querySelector(".hoox-reviews__slider-reviewscontourreviews");

if (hooxSliderReviews2) {
  var slider2 = new Swiper(hooxSliderReviews2, {
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    breakpoints: {
      767: {
        slidesPerView: 1,
        slidesPerGroup: 1,
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
