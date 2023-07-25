function activateAddToCartGoal() {
  window.runExperiment = 1;

  window._conv_q = window._conv_q || [];
  window._conv_q.push(['triggerConversion', '10046163']);
  _conv_q.push(['triggerConversion', '10046163']);
}

const targetEl = document.getElementById('cart-drawer');

// create a new observer instance
const cartObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (
      mutation.attributeName === 'class' &&
      mutation.target.classList.contains('opened-drawer')
    ) {
      activateAddToCartGoal();
    }
  });
});

// pass in the target node, as well as the observer options
cartObserver.observe(targetEl, { attributes: true });
