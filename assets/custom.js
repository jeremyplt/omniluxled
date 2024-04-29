function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var scrollToReviewsSpan = document.getElementById("scrollToReviews");
  if (scrollToReviewsSpan) {
    scrollToReviewsSpan.addEventListener("click", function () {
      var reviewsSection = document.querySelector(
        ".js-oke-widgetSize.oke-is-large, .js-oke-widgetSize.oke-is-small"
      );

      if (reviewsSection) {
        // Scroll smoothly to the reviews section
        reviewsSection.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  }

  waitForElm(".product-details-wrapper [data-oke-metafield-data]").then(
    (elm) => {
      const metafield = jQuery.parseJSON(elm.textContent);
      if (metafield.reviewCount == 0) {
        $(".product-details-wrapper [data-oke-star-rating]").css({
          display: "none",
        });
        $(".trustedbypdp").css({ display: "none" });
      } else {
        console.log("ttt");
        $(".product-details-wrapper [data-oke-star-rating]").css({
          display: "block",
        });
        $(".trustedbypdp").css({ display: "block" });
      }
    }
  );
});

const customSelectors = {};

const menuLinks = document.querySelectorAll(".mega_menu_hover_line");
const subMenuContnets = document.querySelectorAll(".sub_menu");
menuLinks.forEach((menuLink) => {
  menuLink.addEventListener("mouseover", function (e) {
    const element = e.target;
    menuLinks.forEach((menuLink) => {
      menuLink.classList.remove("mega-menu__link--active");
    });
    element.classList.add("mega-menu__link--active");
    const menu_title = e.target.title;
    if (menu_title != "Shop All Products") {
      subMenuContnets.forEach((subMenuContnet) => {
        subMenuContnet.classList.remove("active");
        const handle = subMenuContnet.getAttribute("data-menu-title");
        if (handle == menu_title) {
          subMenuContnet.classList.add("active");
        }
      });
    }
  });
});

const inputElement = document.querySelector(".docapp-coupon-input--input");
if (inputElement)
  inputElement.setAttribute("placeholder", "+ ENTER DISCOUNT CODE");

function sanitizePrice(priceString) {
  // Remove any non-digit characters except for the decimal point
  let numericString = priceString.replace(/[^\d.]/g, "");
  // Convert the clean string to a float to handle numbers correctly
  return parseFloat(numericString);
}

function calculatePriceWithTaxes(price, country, showTaxes = false) {
  const taxData = {
    NZ: 0.15,
    AU: 0.1,
    AD: 0.045,
    SZ: 0.077,
    LI: 0.077,
    LU: 0.16,
    BA: 0.17,
    MT: 0.18,
    XK: 0.18,
    DE: 0.19,
    CY: 0.19,
    AL: 0.21,
    AT: 0.21,
    BY: 0.21,
    BG: 0.21,
    FR: 0.21,
    EE: 0.21,
    GB: 0.21,
    TR: 0.21,
    SK: 0.21,
    RS: 0.21,
    RU: 0.21,
    MC: 0.21,
    MD: 0.21,
    ES: 0.21,
    NL: 0.21,
    ME: 0.21,
    LT: 0.21,
    LV: 0.21,
    BE: 0.21,
    SI: 0.22,
    IT: 0.22,
    PT: 0.23,
    PL: 0.23,
    IE: 0.23,
    IS: 0.24,
    GR: 0.24,
    FI: 0.24,
    SE: 0.25,
    NO: 0.25,
    DK: 0.25,
    HR: 0.25,
    CA: 0.0,
    HU: 0.27,
    CH: 0.081,
  };

  const noPriceDisplayCountries = ["US", "CA"];

  if (
    (!taxData[country] && noPriceDisplayCountries.includes(country)) ||
    (!taxData[country] && !showTaxes)
  )
    return price;
  if (!taxData[country]) return price + "<span class='tax'>Excl. Tax</span>";

  return (
    price * (1 + taxData[country]) +
    (showTaxes ? "<span class='tax'>Incl. Tax</span>" : "")
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const customerCountry = window.customerCountry;
  waitForElm(".cbb-frequently-bought-selector-label-regular-price", 5000).then(
    () => {
      const prices = document.querySelectorAll(
        ".cbb-frequently-bought-selector-label-regular-price, .cbb-frequently-bought-selector-label-compare-at-price, .cbb-frequently-bought-selector-label-sale-price, .cbb-frequently-bought-total-price-sale-price, .cbb-frequently-bought-total-price-was-price"
      );

      setTimeout(() => {
        prices.forEach((price) => {
          const hasAnyClass = [
            "cbb-frequently-bought-selector-label-compare-at-price",
            "cbb-frequently-bought-total-price-was-price",
          ].some((className) => price.classList.contains(className));

          const priceElement = price.querySelector(".money")
            ? price.querySelector(".money")
            : price;
          const priceWithTaxes = calculatePriceWithTaxes(
            sanitizePrice(priceElement.textContent),
            customerCountry,
            hasAnyClass ? false : true
          );
          priceElement.innerHTML = priceWithTaxes;
        });
      }, 1000);
    }
  );
});
