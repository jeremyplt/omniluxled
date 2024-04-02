var hooxSliderReviews = document.querySelector(".hoox-ugc-videos__items");

if (hooxSliderReviews) {
  var slider = new Swiper(hooxSliderReviews, {
  loop: true,
  slidesPerView: 4,
  centeredSlides: true,
  breakpoints: {
    767: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
  },
  pagination: {
    el: '.hoox-swiper-center__pagination',
    clickable: true,
  },
  navigation: {
    nextEl: ".slider-centered-next",
    prevEl: ".slider-centered-prev",
  },
  on: {
    slideChange: function () {
      if (this.isEnd) {
        this.slideTo(0); // Go to the first slide when reaching the end
      }
    }
  }
});
}
