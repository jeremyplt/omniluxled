const selectors = {
    productContainer: document.querySelector('.product-details-wrapper'),
    productMedia: document.querySelector('[data-productMedia]')
  };

  const mediaJSON = JSON.parse(selectors.productMedia.innerHTML);
  window.productMedia = mediaJSON;
  class TemplateProductJS {
    constructor() {
      // Custom code for product page goes here
    }
}

typeof TemplateProductJS !== 'undefined' && new TemplateProductJS();

const box = document.querySelector('.product-add-cart');
var stickyBtn = document.querySelector('[data-stickyBtn]');
document.addEventListener('scroll', function () {
    if(isInViewport(box)){
         if(stickyBtn.classList.contains('d-block')){
            stickyBtn.classList.remove('d-block');
        }
        stickyBtn.classList.add('d-none')
    } else{
       if(stickyBtn.classList.contains('d-none')){
            stickyBtn.classList.remove('d-none');
        }
        stickyBtn.classList.add('d-block')
    }
}, {
    passive: true
});
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}



class model3d {
  constructor() {
    this.model3d_btn=document.querySelector('.cover-3d-wrap');
    this.model3d_btn.addEventListener('click', this.toggle3Dmodel.bind(this));
  }
  toggle3Dmodel(event){
    let currentTarget=  event.currentTarget;
    if (currentTarget.classList.contains('show_3d_btn')) {
      currentTarget.classList.remove('show_3d_btn')
    } else {
      currentTarget.classList.add('show_3d_btn')
    }
  }
}

typeof model3d !== 'undefined' && new model3d();