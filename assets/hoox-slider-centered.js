var hooxSliderCentered = document.querySelectorAll('.hoox-swiper-center');

if (!!hooxSliderCentered.length) {
    hooxSliderCentered = Array.from(hooxSliderCentered);
    hooxSliderCentered.forEach(element => {
        var slides = element.querySelectorAll('.swiper-slide');

        var swiperOptions = {
            loop: true,
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 10,
            pagination: {
                el: '.hoox-swiper-center__pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.slider-centered-next',
                prevEl: '.slider-centered-prev',
            },
        };

        if (window.innerWidth < 767 && slides.length > 1) { // Initialize on mobile with more than 1 slide
            new Swiper(element, swiperOptions);
        } else if (window.innerWidth > 767 && slides.length > 3) { // Initialize on desktop with more than 3 slides
            swiperOptions.breakpoints = {
                766: {
                    slidesPerView: 3,
                    slidesPerGroup: 1,
                    spaceBetween: 50,
                    touchRatio: 0,
                }
            };
            new Swiper(element, swiperOptions);
        } else { // Hide navigation arrows if Swiper is not initialized
            var navigation = element.querySelectorAll('.hoox-ugc-videos__navigation');
            navigation.forEach(navItem => {
                navItem.style.display = 'none';
                navItem.style.margin = '0';
            });
        }
    });
}