window.addEventListener('DOMContentLoaded', () => {
    const tableClass = '.table-swiper-mob';
    const tableContainer = document.querySelector(tableClass);
    if (tableContainer && window.innerWidth < 768) {
        var tableSwiper = new Swiper(tableContainer, {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0,
            watchOverflow: true,
            loop: false,
            effect: 'fade',
            pagination: {
                el: '.b-comparison-table__pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next-table',
                prevEl: '.swiper-button-prev-table',
            },
        })
    }
});
