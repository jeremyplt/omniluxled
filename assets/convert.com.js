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

  if (!window.runExperiment100483406 && hasElementInViewport) {
    window.runExperiment100483406 = 1;
    window._conv_q = window._conv_q || [];
    window._conv_q.push(["executeExperiment", "100483406"]);
    console.log(
      "Convert - Home Page Featured Products Swap - Experiment Activated"
    );
  }
}
