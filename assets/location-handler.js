class LocationHandler {
  constructor() {
    this.PDPCartBtnElements = document.querySelectorAll('.data-submit-btn');
  }

  onPageLoad() {
    this.locationHandler();
  }

  async locationHandler() {
    const country = localStorage.getItem('country') || 'United States';

    const prefixMap = {
      'United States': 'us',
      'United Kingdon': 'uk',
      'Canada': 'ca',
      'Australia': 'au',
      'New Zealand': 'nz',
    }

    const prefix = prefixMap[country] || 'eu'

    console.log(prefix)

    this.pdp(prefix)
    this.cart(prefix)
  }

  cart(prefix) {
    const payIconTag = document.querySelector(
      '.shopify-installments__content-image'
    );
    if (prefix == 'us') {
      payIconTag.setAttribute(
        'src',
        'https://cdn.shopify.com/s/files/1/0482/6736/2466/files/ShopPay_-_Color.svg?v=1697732176'
      );
    } else {
      payIconTag.setAttribute(
        'src',
        'https://cdn.shopify.com/s/files/1/0482/6736/2466/files/Afterpay_Mint_Logo.jpg?v=1687306677'
      );
      payIconTag.setAttribute('style', 'display:inline;width:90px;');
    }
  }

  pdp(prefix) {
    const comingsoonStatusKey = `${prefix}_add_coming_soon_tag`;

    const preorderStatusKey = `${prefix}_preorder`;
    const preorderMessageKey = `${prefix}_product_page_messaging`;

    if (comingsoonStatusKey) {
      this.PDPCartBtnElements.forEach((btn) => {
        const comingsoonStatus = btn.dataset?.[comingsoonStatusKey];

        if (comingsoonStatus === 'true') {
          btn.innerHTML = '<span class="add-text">Coming Soon</span>';
          btn.classList.add('disabled');
        } else {
          const preorderStatus = btn.dataset?.[preorderStatusKey];
          const preorderMessage = btn.dataset?.[preorderMessageKey];

          if (preorderStatus === 'true') {
            btn.innerHTML = '<span class="add-text">Pre-order</span>';
          }

          const msgEle = btn
            .closest('[data-product-form]')
            .querySelector('[data-product-preorder-message]');
          if (preorderStatus === 'true' && preorderMessage !== '' && msgEle) {
            msgEle.innerHTML = `
                      <div class="align-items-center mt-2 mb-lg-3 mb-2 py-1 formatted-list fw-normal">
                         <ul>${preorderMessage}</ul>
                      </div>
                          `;
          }
        }
      });
    }
  }
}

const locationHandler = new LocationHandler();
window.addEventListener('DOMContentLoaded', () => locationHandler.onPageLoad());
