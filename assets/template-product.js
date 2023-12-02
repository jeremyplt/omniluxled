function waitForElm(selector) {
  return new Promise(resolve => {
      if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
              observer.disconnect();
              resolve(document.querySelector(selector));
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true
      });
  });
}

$(document).ready(function () {
  waitForElm('.cbb-frequently-bought-container').then((elm) => {    
    $('.cbb-frequently-bought-products').after($('<div class="cbb-frequently-bought-recommendations-wrap"></div>'));
    $('.cbb-frequently-bought-recommendations-wrap').append($('.cbb-frequently-bought-selector-list'));
    $('.cbb-frequently-bought-recommendations-wrap').append($('.cbb-frequently-bought-form'));
    $('.cbb-frequently-bought-total-price-text').text("Total:");  
    $('.cbb-frequently-bought-title').text($('div[data-template="product"]').data( "product-upsell-title"));   
    $('.cbb-frequently-bought-container').css("display", "block");
  })

  $("#gorgias-chat-start").click(function(){   
    const chatWindow = $('#gorgias-chat-container #chat-window').css('display')
    if(chatWindow == undefined || chatWindow == 'none'){      
      console.log("start chat show")
      $("#gorgias-chat-container #chat-button").contents().find('button[data-testid="gorgias-chat-messenger-button"]').click();  
    }
    
    if($('#gorgias-chat-container #chat-button').css('visibility') == 'hidden'){      
      $('#gorgias-chat-container #chat-button').attr('style', 'right: 20px;bottom: 20px;visibility: visible !important;width: 72px;height: 66px;');
    }  
  }) 
  
  $("#gorgias-chat-container #chat-button").contents().find('button[data-testid="gorgias-chat-messenger-button"]').click(function(){    
    if($('#gorgias-chat-container #chat-button').css('visibility') == 'visible'){      
      $('#gorgias-chat-container #chat-button').attr('style', 'visibility: hidden !important');
    }  
  })    
});

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