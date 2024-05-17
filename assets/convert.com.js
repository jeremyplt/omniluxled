/**
 * FAQ on PDP - Above the fold
 */
let fold =
  document.getElementsByClassName("cbb-frequently-bought-container")
    ?.offsetTop || 500;

window.addEventListener("scroll", function (e) {
  if (this.scrollY > fold - window.innerHeight) {
    if (window.runExperiment != "fbt") {
      window.runExperiment = "fbt";

      window._conv_q = window._conv_q || [];
      window._conv_q.push(["executeExperiment", "100433096"]);
      _conv_q.push(["executeExperiment", "100433096"]);

      window._conv_q.push(["triggerConversion", "100420805"]);
      _conv_q.push(["triggerConversion", "100420805"]);

      console.log("FBT run correctly");
    }
  }
});

// Update Slider
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");
  var swiperElement = document.querySelector(".product-carousel");
  if (swiperElement) {
    // Parse the JSON configuration from the data attribute
    var swiperConfig = JSON.parse(swiperElement.getAttribute("data-slider"));

    // Initialize Swiper using the configuration from the data attribute
    var mySwiper = new Swiper(swiperElement, swiperConfig);

    // If you need to access 'mySwiper' elsewhere, consider using a broader scope
    window.mySwiper = mySwiper;
  }
});

window.addEventListener("load", function () {
  console.log("WINDOW_MYSLIDER_LOAD");
  window?.mySwiper?.update();
});

document.addEventListener("cart-drawer:open", () => {
  if (
    document.querySelectorAll(".item-main-upsell").length > 0 &&
    !window.runExperiment100454510
  ) {
    window.runExperiment100454510 = 1;
    window._conv_q = window._conv_q || [];
    window._conv_q.push(["executeExperiment", "100454510"]);
    console.log(
      "Convert - Subscription Selection Cart Drawer - Experience Activated!"
    );
  }
});

////////////*** HELPER FUNCTION ***////////////

function waitForElement(querySelector, timeout) {
  return new Promise((resolve, reject) => {
    var timer = false;
    if (document.querySelectorAll(querySelector).length) return resolve();
    const observer = new MutationObserver(() => {
      if (document.querySelectorAll(querySelector).length) {
        observer.disconnect();
        if (timer !== false) clearTimeout(timer);
        return resolve();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    if (timeout)
      timer = setTimeout(() => {
        observer.disconnect();
        reject();
      }, timeout);
  });
}

function getViewportHeight() {
  return Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
}

function getScrollTop() {
  return window.pageYOffset !== undefined
    ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
}

function isInViewport(element) {
  if (element === null) return false; // Ensure the element exists before proceeding

  var rect = element.getBoundingClientRect();
  var elementTop = rect.top + getScrollTop();
  var elementBottom = elementTop + rect.height;
  var viewportTop = getScrollTop();
  var viewportBottom = viewportTop + getViewportHeight();
  return elementBottom > viewportTop && elementTop < viewportBottom;
}

////////////*** END HELPER FUNCTION ***////////////

window.addEventListener("scroll", featuredCollectionViewport);
document.addEventListener("DOMContentLoaded", featuredCollectionViewport);

function featuredCollectionViewport() {
  const featuredCollection = document.querySelector("#featuredcollection");

  const hasElementInViewport =
    featuredCollection && isInViewport(featuredCollection);

  if (!window.runExperiment100477329 && hasElementInViewport) {
    window.runExperiment100477329 = 1;
    window._conv_q = window._conv_q || [];
    window._conv_q.push(["executeExperiment", "100477329"]);
    console.log(
      "Convert - Home Page Featured Products Swap - Experiment Activated"
    );
  }
}
