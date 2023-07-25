class LocationHandler {
  constructor() {
    this.PDPCartBtnElements = document.querySelectorAll('.data-submit-btn');
  }

  onPageLoad() {
    this.locationHandler();
  }

  async locationHandler() {
    fetch(`https://ipapi.co/json/`)
      .then((response) => response.json())
      .then((data) => {
        const continent = data?.continent_code.toLowerCase();
        const country = data?.country_tld.replace('.', '');

        let prefix = '';
        if (['us', 'uk', 'ca', 'au', 'nz'].includes(country)) {
          prefix = country;
        } else if (continent === 'eu') {
          prefix = continent;
        }

        if (prefix) {
          this.pdp(prefix);
          this.cart(prefix);
        } else {
          console.log('We are not shipping to your location.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  cart(prefix) {
    const payIconTag = document.querySelector(
      '.shopify-installments__content-image'
    );
    if (prefix == 'us') {
      payIconTag.setAttribute(
        'src',
        'https://cdn.shopify.com/s/files/1/0482/6736/2466/t/190/assets/6220a9b0912013c51947f9b8.png'
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
