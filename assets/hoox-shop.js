//Slider logic
var galleryThumbs = new Swiper(".hoox-shop__gallery-thumbs", {
  slidesPerView: 5,
  spaceBetween: 4,
  loop: true,
  watchSlidesProgress: true,
  breakpoints: {
        767: {
            direction: "vertical",
            spaceBetween: 4,
        }
    },
});

var galleryTop = new Swiper(".hoox-shop__gallery-main", {
    slidesPerView: 1,
    loop: true,
    thumbs: {
      swiper: galleryThumbs,
    },
  });
  

  const videoHolders = document.querySelectorAll('.hoox-shop__video-holder');
  if (!!videoHolders.length) {
      videoHolders.forEach(element => {
          // Video logic
        //   const videoPosterImage = element.querySelector('.hoox-shop__video-poster');
        //   const videoPlayButton = element.querySelector('.js-video-play');
        //   const video = element.querySelector('video');
  
        //   videoPlayButton.addEventListener('click', () => {
        //       videoPosterImage.classList.add('video-playing');
        //       videoPlayButton.classList.add('video-playing');
  
        //       if (video.paused == false) {
        //           video.pause();
        //       } else {
        //           video.play();
        //       }
        //   });
  
        //   video.addEventListener('pause', () => {
        //       videoPosterImage.classList.remove('video-playing');
        //       videoPlayButton.classList.remove('video-playing');
        //   });
  
        //   video.addEventListener('ended', () => {
        //       videoPosterImage.classList.remove('video-playing');
        //       video.classList.remove('video-playing');
        //   });
  
          // Toggle video modal logic for multiple trigger classes
          const modalTriggers = element.querySelectorAll('.js-video-modal-trigger');
          const videoModal = element.querySelector('.hoox-shop__video-modal');
          const videoCloseButton = element.querySelector('.js-video-modal-close');
          const videoIframe = element.querySelector('.hoox-shop__video-iframe iframe');
          const videoOutsideButton = element.querySelector('.js-video-modal-outside');
          modalTriggers.forEach(trigger => {
              trigger.addEventListener('click', () => {
                  videoModal.classList.toggle('open-modal');
                  var originalVideoLink = videoIframe.dataset.originalLink;
                  videoIframe.src = originalVideoLink;
                  var modifiedSrc = videoIframe.src.replace('autoplay=0', 'autoplay=1');
                  videoIframe.src = modifiedSrc;
                  element.classList.toggle('active');
                //   if (video.paused == false) video.pause();
              });
          });
          videoCloseButton.addEventListener('click', function(){
            var originalVideoLink = videoIframe.dataset.originalLink;
            videoIframe.src = '';
            videoIframe.src = originalVideoLink;
          })

          videoOutsideButton.addEventListener('click', function(){
            videoModal.classList.remove('open-modal');
            element.classList.remove('active');
            var originalVideoLink = videoIframe.dataset.originalLink;
            videoIframe.src = '';
            videoIframe.src = originalVideoLink;
          })
      });
  }
  

//AFTERPAY Modal Handle
const afterpayHolder = document.querySelector('.hoox-shop__afterpay-modal');
const afterpayTogglers = document.querySelectorAll('.js-afterpay-toggle');
const afterpayModalOverlay = afterpayHolder.querySelector('.afterpay-modal-overlay');

afterpayTogglers.forEach(toggler => {
    toggler.addEventListener('click', () => {
        afterpayModalOverlay.classList.toggle('visible');
    })

    window.addEventListener('click', (e) => {
        if(e.target.classList.contains('afterpay-modal-overlay', 'visible')) {
            afterpayModalOverlay.classList.remove('visible');
        }
    })
});




