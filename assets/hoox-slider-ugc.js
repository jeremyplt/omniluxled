var hooxSliderReviews = document.querySelector(".hoox-ugc-videos__items");

if (hooxSliderReviews) {
  

function isMobileDevice() {
  return window.innerWidth <= 767; // Adjust the width as per your mobile breakpoint
}

// Example usage
if (isMobileDevice()) {
console.log("on mobile");
  // Code for mobile devices

  var slider = new Swiper(hooxSliderReviews, {
  loop: true,
  slidesPerView: 1, // Show 4 slides at once
    // 
  pagination: {
    el: '.hoox-swiper-center__pagination',
    clickable: true,
  },
  navigation: {
    nextEl: ".slider-centered-next",
    prevEl: ".slider-centered-prev",
  }
});
} else {
  console.log("on desktop");
  var slider = new Swiper(hooxSliderReviews, {
  loop: true,
  slidesPerView: 4, // Show 4 slides at once
  spaceBetween: 20,
   breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
     
    // 
  pagination: {
    el: '.hoox-swiper-center__pagination',
    clickable: true,
  },
  navigation: {
    nextEl: ".slider-centered-next",
    prevEl: ".slider-centered-prev",
  }
});
}
}
