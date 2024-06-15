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
  const numeric = priceString.includes(",")
    ? numericString * 1
    : numericString * 100;
  // Convert the clean string to a float to handle numbers correctly
  return parseFloat(numeric);
}

function calculatePriceWithTaxes(price, country, showTaxes = false) {
  const taxData = window.taxData;

  const noPriceDisplayCountries = ["US", "CA"];

  let taxRate = taxData[country];
  let taxInclusivePrice = price * (1 + taxRate);
  let formattedTaxInclusivePrice = Shopify.formatMoney(
    taxInclusivePrice,
    window.globalVariables.money_format
  );
  let formattedTaxExclusivePrice = Shopify.formatMoney(
    price,
    window.globalVariables.money_format
  );

  if (country === "LU") {
    return `<span class="tax-excl-price">${formattedTaxExclusivePrice}</span><span class='tax tax-excl'> Excl. Tax</span> <span>${formattedTaxInclusivePrice}</span><span class='tax'> Incl. Tax</span>`;
  } else if (taxRate !== undefined && showTaxes) {
    return formattedTaxInclusivePrice + "<span class='tax'> Incl. Tax</span>";
  } else if (taxRate !== undefined) {
    return formattedTaxInclusivePrice;
  }

  return noPriceDisplayCountries.includes(country)
    ? formattedTaxExclusivePrice
    : formattedTaxExclusivePrice +
        (showTaxes ? "<span class='tax'> Excl. Tax</span>" : "");
}

document.addEventListener("DOMContentLoaded", function () {
  const customerCountry = window.customerCountry;
  waitForElm(".cbb-frequently-bought-selector-label-regular-price", 5000).then(
    () => {
      function changePrices() {
        const prices = document.querySelectorAll(
          ".cbb-frequently-bought-selector-label-regular-price, .cbb-frequently-bought-selector-label-compare-at-price, .cbb-frequently-bought-selector-label-sale-price, .cbb-frequently-bought-total-price-sale-price, .cbb-frequently-bought-total-price-was-price, .cbb-frequently-bought-total-price-regular-price"
        );
        prices.forEach((price) => {
          const hasAnyClass = [
            "cbb-frequently-bought-selector-label-compare-at-price",
            "cbb-frequently-bought-total-price-was-price",
          ].some((className) => price.classList.contains(className));

          const priceElement = price.querySelector(".money")
            ? price.querySelector(".money")
            : price;

          console.log("priceElement", priceElement.textContent);
          const priceWithTaxes = calculatePriceWithTaxes(
            sanitizePrice(priceElement.textContent),
            customerCountry,
            hasAnyClass ? false : true
          );

          console.log("priceWithTaxes", priceWithTaxes);
          priceElement.innerHTML = priceWithTaxes;
        });
      }

      setTimeout(() => {
        const variantSelects = document.querySelectorAll(
          ".cbb-recommendations-variant-select"
        );

        console.log("variantSelects", variantSelects);

        if (variantSelects.length > 0) {
          variantSelects.forEach((select) => {
            select.addEventListener("change", () => {
              changePrices();
            });
          });
        }

        changePrices();
      }, 1000);
    }
  );
});
