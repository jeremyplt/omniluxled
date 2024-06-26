// Ajax cart JS for Drawer and Cart Page
const drawerSelectors = {
  cartIcons: document.querySelectorAll(".header__icon--cart"),
  cartIconDesktop: document.querySelector("#cart-icon-desktop"),
  cartIconMobile: document.querySelector("#cart-icon-mobile"),
  cartDrawerCount: document.querySelector("[data-drawer-cart-count]"),
};
class AjaxCart extends HTMLElement {
  constructor() {
    super();

    this.openeBy = drawerSelectors.cartIcons;
    this.isOpen = this.classList.contains("open--drawer");
    this.bindEvents();
    this.cartNoteInput();
    this.querySelectorAll(".close-ajax--cart").forEach((button) =>
      button.addEventListener("click", this.closeCartDrawer.bind(this))
    );
    document
      .querySelectorAll("[data-gwp-close]")
      .forEach((button) =>
        button.addEventListener("click", this.closePopup.bind(this))
      );
    document
      .querySelectorAll("[add-gwp-product]")
      .forEach((button) =>
        button.addEventListener("click", this.addMultiGWPProduct.bind(this))
      );

    if (window.globalVariables.template != "cart") {
      this.addAccessibilityAttributes(this.openeBy);
      this.getCartData();
    } else {
      this.style.visibility = "visible";
    }

    if (navigator.platform === "iPhone")
      document.documentElement.style.setProperty(
        "--viewport-height",
        `${window.innerHeight}px`
      );
  }

  manageQtyInput(event) {
    let input = event.currentTarget;
    if (input.value < 0) input.value = Math.abs(input.value);
    if (input.value.length > 2) input.value = input.value.slice(0, 2);
  }

  /**
   * Observe attribute of component
   *
   * @returns {array} Attributes to Observe
   */
  static get observedAttributes() {
    return ["updating"];
  }

  /**
   * To Perform operation when attribute is changed
   * Calls attributeChangedCallback() with params when attribute value is updated
   *
   * @param {string} name attribute name
   * @param {string} oldValue attribute Old value
   * @param {string} newValue attribute latest value
   */
  attributeChangedCallback(name, _oldValue, newValue) {
    // called when one of attributes listed above is modified
    if (name == "updating" && newValue == "false") {
      this.updateEvents();
    }
  }

  /**
   * Add accessibility attributes to Open Drawer buttons
   *
   * @param {Node Array} openDrawerButtons Cart Icons
   */
  addAccessibilityAttributes(openDrawerButtons) {
    let _this = this;
    openDrawerButtons.forEach((element) => {
      element.setAttribute("role", "button");
      element.setAttribute("aria-expanded", false);
      element.setAttribute("aria-controls", _this.id);
    });
  }

  /**
   * Escape Click event to close drawer when focused within Cart Drawer
   *
   * @param {event} Event instance
   */
  onKeyUp(event) {
    if (event.code.toUpperCase() !== "ESCAPE") return;
    this.querySelector(".close-ajax--cart").dispatchEvent(new Event("click"));
  }

  /**
   * bind dclick and keyup event to Cart Icons
   * bind keyUp event to Cart drawer component
   * bind Other inside element events
   *
   */
  bindEvents() {
    if (window.globalVariables.template != "cart") {
      this.openeBy.forEach((cartBtn) =>
        cartBtn.addEventListener("click", this.openCartDrawer.bind(this))
      );
      this.addEventListener("keyup", this.onKeyUp.bind(this));
    }
    // this.updateEvents();
  }

  /**
   * bind Other inside element events to DOM
   *
   */
  updateEvents() {
    this.querySelectorAll("[data-itemRemove]").forEach((button) =>
      button.addEventListener("click", this.removeItem.bind(this))
    );
    this.querySelectorAll("[data-qty-btn]").forEach((button) =>
      button.addEventListener("click", this.manageQtyBtn.bind(this))
    );
    this.querySelectorAll("[data-qty-input]").forEach((button) =>
      button.addEventListener("change", this.onQtyChange.bind(this))
    );
    this.querySelectorAll("[data-gwp-multi-tier]").forEach((button) =>
      button.addEventListener("click", this.openPopup.bind(this))
    );
  }

  addEventListenerUpsells() {
    const upsells = document.querySelectorAll(".cart-upsell");

    upsells.forEach((upsell) => {
      const form = upsell.querySelector(".cart-upsell-form");
      const productsToRemove = upsell
        .getAttribute("data-products-remove")
        .split(",");

      // remove the last element of the array if it's empty
      if (productsToRemove[productsToRemove.length - 1] === "") {
        productsToRemove.pop();
      }

      form.addEventListener("submit", (event) => {
        productsToRemove.forEach((variantId) => {
          setTimeout(() => {
            fetch("/cart/change.js", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: variantId,
                quantity: 0,
              }),
            }).then((response) => {
              if (response.ok) {
                this.getCartData();
              }
            });
          }, 500);
        });
      });
    });
  }

  renderUpsells() {
    // Do not include "shopify-section" in the selector, it will break the render
    // Use "?sections={section-id}" to render several sections

    // Fetch a Shopify section. shopify-section only if static section rendered with section tag
    fetch(window.Shopify.routes.root + "?section_id=cart-drawer")
      .then((response) => response.text())
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, "text/html");
        const source = html.querySelector(
          ".swiper-container.upsell-slider .swiper-wrapper"
        );
        const destination = document.querySelector(
          ".swiper-container.upsell-slider .swiper-wrapper"
        );

        const sourceTitle = html.querySelector(".cart-upsell-title");
        const destinationTitle = document.querySelector(".cart-upsell-title");

        destinationTitle.innerHTML = sourceTitle.innerHTML;
        destination.innerHTML = source.innerHTML;

        if (source.children.length == 0) {
          document.querySelector(".cart-upsell-title").style.display = "none";
        } else {
          document.querySelector(".cart-upsell-title").style.display = "block";
        }

        this.addEventListenerUpsells();
      })
      .catch((error) => console.error(error));
  }
  /**
   * Open Cart drawer and add focus to drawer container
   *
   * @param {event} Event instance
   */
  openCartDrawer(event) {
    if (!window.globalVariables.cart_drawer) {
      window.location.href = window.routes.cart_fetch_url || "/cart";
      return;
    }

    if (
      document
        .querySelector("#mobile-menu-drawer")
        .classList.contains("opened-drawer")
    ) {
      document
        .querySelector(".close-mobile--navbar")
        .dispatchEvent(new Event("click"));
    }

    this.classList.add("opened-drawer");
    siteOverlay.prototype.showOverlay();
    Utility.forceFocus(this.querySelector(".cart-title"));
    let closeBtn = this.querySelector(".close-ajax--cart");
    Utility.trapFocus(this, closeBtn);

    this.renderUpsells();

    if (event) {
      event.preventDefault();
      let openBy = event.currentTarget;
      openBy.setAttribute("aria-expanded", true);
    }

    // dispatch custom event cart-drawer:open
    document.dispatchEvent(new Event("cart-drawer:open"));
  }

  /**
   * Close Cart drawer and Remove focus from drawer container
   *
   * @param {event} Event instance
   */
  closeCartDrawer(event, elementToFocus = false) {
    if (event !== undefined) {
      event.preventDefault();
      this.classList.remove("opened-drawer");
      siteOverlay.prototype.hideOverlay();
      let openByEle = event.currentTarget;
      openByEle.setAttribute("aria-expanded", false);
      Utility.removeTrapFocus(elementToFocus);

      let actionBtn = drawerSelectors.cartIconDesktop;
      if (window.innerWidth < 1024) {
        actionBtn = drawerSelectors.cartIconMobile;
      }
      Utility.forceFocus(actionBtn);
    }
  }

  openPopup(event) {
    var getDivID = event.target.getAttribute("data-gwp-multi-tier");
    document
      .getElementById(getDivID)
      .querySelector(".modal")
      .classList.add("open");
    if (!event.currentTarget.hasAttribute("data-drawer-popup")) {
      siteOverlay.prototype.showOverlay();
    }
    document.querySelector("body").classList.add("gwp-tier-open");
  }

  closePopup(event) {
    event.target.closest(".modal").classList.remove("open");
    //console.log('hereee', event.target.closest('.modal'))
    if (!event.currentTarget.hasAttribute("data-drawer-popup")) {
      siteOverlay.prototype.hideOverlay();
    }
    document.querySelector("body").classList.remove("gwp-tier-open");
  }

  calculatePriceWithTaxes(price, country) {
    const taxData = window.taxData;

    if (!taxData[country]) return price;
    return price * (1 + taxData[country]);
  }

  /**
   * Update cart HTML and Trigger Open Drawer event
   *
   * @param {string} cartHTML String formatted response from fetch cart.js call
   * @param {string} action Open Drawer as value if need to Open Cart drawer
   */
  _updateCart(response, action) {
    // Convert the HTML string into a document object
    let cartHTML = "";
    if (window.globalVariables.template != "cart") {
      cartHTML = response["template-cart-drawer"];
    } else {
      cartHTML = response["template-cart"];
    }

    if (cartHTML == null) return;
    let parser = new DOMParser();
    cartHTML = parser.parseFromString(cartHTML, "text/html");

    let cartJSONEle = cartHTML.querySelector("[data-cartScriptJSON]");
    if (cartJSONEle != undefined && cartJSONEle != null) {
      window.globalVariables.cart = JSON.parse(cartJSONEle.textContent);
    }

    let cartElement = cartHTML.querySelector("ajax-cart form");
    this.querySelector("form").innerHTML = cartElement.innerHTML;

    this.querySelector("[data-carttotal]").innerHTML = Shopify.formatMoney(
      this.calculatePriceWithTaxes(
        window.globalVariables.cart.total_price,
        window.customerCountry
      ),
      window.globalVariables.money_format
    );

    let elements = this.querySelectorAll(
      "[data-checkoutBtns], [data-cartnote], [data-cartupsell]"
    );
    if (window.globalVariables.cart.item_count <= 0) {
      elements.forEach((div) => {
        div.classList.add("d-none");
      });
      if (document.querySelector("[data-upsell-product]")) {
        document.querySelector("[data-upsell-product]").classList.add("d-none");
      }
      drawerSelectors.cartDrawerCount.innerHTML = "0";
    } else {
      elements.forEach((div) => {
        div.classList.remove("d-none");
      });
      if (document.querySelector("[data-upsell-product]")) {
        document
          .querySelector("[data-upsell-product]")
          .classList.remove("d-none");
      }
    }
    this.setAttribute("updating", false);

    let cartCount = cartHTML.querySelector(
      "[data-drawer-cart-count]"
    ).innerHTML;
    if (drawerSelectors.cartIconDesktop.querySelector(".cart-count"))
      drawerSelectors.cartIconDesktop.querySelector(".cart-count").innerHTML =
        cartCount;
    if (drawerSelectors.cartIconMobile.querySelector(".cart-count"))
      drawerSelectors.cartIconMobile.querySelector(".cart-count").innerHTML =
        cartCount;
    if (window.globalVariables.cart.item_count > 0) {
      if (drawerSelectors.cartDrawerCount.querySelector(".cart-count"))
        drawerSelectors.cartDrawerCount.querySelector(".cart-count").innerHTML =
          cartCount;
    }
    drawerSelectors.cartDrawerCount.innerHTML = cartCount;

    this.qtyInputs = this.querySelectorAll("input[data-qty-input]");
    this.qtyInputs.forEach((qtyInput) => {
      qtyInput.addEventListener("keyup", this.manageQtyInput.bind(this));
    });

    if (
      window.globalVariables.cart_drawer &&
      action == "open_drawer" &&
      window.globalVariables.template != "cart"
    ) {
      this.openCartDrawer();
    }

    // Extend - Dispatch event
    window.setTimeout(function () {
      window.dispatchEvent(new Event("refreshAjaxCart"));
      window.dispatchEvent(new Event("refreshAjaxSideCart"));
    }, 500);
    // Extend - End code
  }

  addGWPProduct(id, gwp_type) {
    if (gwp_type == "gwpc") {
      var body = {
        id: parseInt(id),
        quantity: 1,
        properties: {
          product_type: "gwpc",
          free_product: "true",
        },
      };
    } else if (gwp_type == "gwpp") {
      var body = {
        id: parseInt(id),
        quantity: 1,
        properties: {
          product_type: "gwpp",
          free_product: "true",
        },
      };
    } else if (gwp_type == "tier1") {
      var body = {
        id: parseInt(id),
        quantity: 1,
        properties: {
          product_type: "tier1",
          free_product: "true",
        },
      };
    }

    const result = fetch("/cart/add.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      document.querySelector("ajax-cart").getCartData();
    });
  }

  addMultiGWPProduct(event) {
    event.preventDefault();
    event.stopPropagation();
    //console.log('callllll')
    let currentTarget = event.currentTarget;
    let upsellProductVariantId =
      currentTarget.getAttribute("add-gwp-product") || null;
    var closeBtn = currentTarget
      .closest(".modal")
      .querySelector(".close-popup");
    var gwpType = currentTarget.getAttribute("data-gwp-type");

    // currentTarget.setAttribute('disabled', true);
    currentTarget.classList.add("loading");
    // currentTarget.querySelector('[data-btn-txt]').classList.add('d-none');
    var allBtns = currentTarget
      .closest(".modal")
      .querySelectorAll("[add-gwp-product]");
    allBtns.forEach((button) => button.classList.add("disable-element"));

    if (gwpType == "tier1") {
      var body = {
        id: parseInt(upsellProductVariantId),
        quantity: 1,
        properties: {
          product_type: "tier1",
          free_product: "true",
        },
      };
    }

    const result = fetch("/cart/add.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      allBtns.forEach((button) => button.classList.remove("disable-element"));
      // currentTarget.setAttribute('disabled', false);
      currentTarget.classList.remove("loading");
      // currentTarget.querySelector('[data-btn-txt]').classList.remove('d-none');
      closeBtn.click();
      document.querySelector("ajax-cart").getCartData();
    });
  }

  removeSampleProducts(ids) {
    var varArray = ids.split(",");
    var data = {};

    for (let index = 0; index < varArray.length; ++index) {
      data[varArray[index]] = 0;

      if (index == varArray.length - 1) {
        const result = fetch("/cart/update.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ updates: data }),
        }).then((response) => {
          document.querySelector("ajax-cart").getCartData();
        });
      }
    }
  }

  /**
   * Fetch latest cart data
   *
   * @param {string} action Open Drawer as value if need to Open Cart drawer or else let it be empty
   */
  getCartData(action) {
    let cartRoute = `${routes.cart_fetch_url}?sections=template-cart`;
    if (window.globalVariables.template != "cart") {
      cartRoute = `${routes.cart_fetch_url}?sections=template-cart-drawer`;
    }
    //console.log('getCartData action: '+action);
    this.checkGiftWithPurchase();
    fetch(cartRoute)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this._updateCart(response, action);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        // Cart HTML fetch done
      });
  }

  checkGiftWithPurchase() {
    //CHECK GIFT WITH PURCHASE ELIGIBLE WHEN THERE'S A CHANGE IN CART
    if (!window.theme.giftWithPurchase.enabled) return;
    var isGiftInCart = false;
    var isEligigleGift = false;
    //GET CURRENT CART CONTENT
    fetch("/cart.json")
      .then((response) => {
        if (response.status === 200) {
          response.json().then((updatedCart) => {
            if (updatedCart.items) {
              updatedCart.items.forEach((item, index) => {
                var handle = item.handle;
                var freeGift = item.properties["free_gift"];
                if (freeGift == true) {
                  if (item.quantity > 1) {
                    //if there're more than 1 free gift, set it as 1
                    this.updateItemQty(item.key, 1);
                  }
                  isGiftInCart = true; //this item is free gift
                  return;
                }
                if (
                  window.theme.giftWithPurchase.eligigleProducts.indexOf(
                    "|" + handle + "|"
                  ) !== -1
                ) {
                  isEligigleGift = true; //this item is eligible to receive gift
                  return 0;
                }
              });
              //console.log('isGiftInCart: ' + isGiftInCart);
              //console.log('isEligigleGift: ' + isEligigleGift);
              if (isEligigleGift && !isGiftInCart) {
                //Call add gift to cart
                if (window.theme.giftWithPurchase.giftProductID) {
                  this.addFreeProduct(
                    window.theme.giftWithPurchase.giftProductID
                  );
                }
              }
              if (!isEligigleGift && isGiftInCart) {
                //Call remove gift to cart
                if (window.theme.giftWithPurchase.giftProductID) {
                  this.removeFreeProduct(
                    window.theme.giftWithPurchase.giftProductID
                  );
                }
              }
            }
            if (updatedCart.item_count == 0) {
              //Reset Gift was removed when cart is empty
              sessionStorage.removeItem("gwpRemoved");
              document.querySelectorAll("ajax-cart").forEach((ajaxCart) => {
                ajaxCart.classList.add("empty-cart");
              });
            } else {
              document.querySelectorAll("ajax-cart").forEach((ajaxCart) => {
                ajaxCart.classList.remove("empty-cart");
              });
            }
          });
        } else {
          throw new Error(
            `refreshCart function failed to get request, Shopify returned ${response.status} ${response.statusText}`
          );
        }
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        // Cart HTML fetch done
      });
  }

  addFreeProduct(productVariantId) {
    //ADD FREE PRODUCT TO CART WITH VARIANT ID
    if (
      sessionStorage.getItem("gwpRemoved") ||
      getFromSessionStorage(gwpLocalCheck)
    ) {
      //console.log('preventing duplicate call')
      return;
    }
    // else add the thing
    setInSessionStorage(gwpLocalCheck, "true");
    var VID = productVariantId;
    var addData = {
      id: VID,
      quantity: 1,
      properties: {
        free_gift: true,
      },
    };
    fetch("/cart/add.js", {
      body: JSON.stringify(addData),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "xmlhttprequest",
      },
      method: "POST",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        removeFromSessionStorage(gwpLocalCheck);
        document.querySelector("ajax-cart").getCartData(); //CALL UPDATE CART
      })
      .catch(function (err) {
        console.error(err);
        removeFromSessionStorage(gwpLocalCheck);
      });
  }

  removeFreeProduct(productVariantId) {
    //REMOVE FREE PRODUCT TO CART WITH VARIANT ID
    var VID = productVariantId;
    var removeData = {
      id: VID,
      quantity: 0,
      properties: {
        free_gift: true,
      },
    };
    fetch("/cart/change.js", {
      body: JSON.stringify(removeData),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "xmlhttprequest",
      },
      method: "POST",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        removeFromSessionStorage(gwpLocalCheck);
        document.querySelector("ajax-cart").getCartData(); //CALL UPDATE CART
      })
      .catch(function (err) {
        console.error(err);
        removeFromSessionStorage(gwpLocalCheck);
      });
  }

  /**
   * Update Quantity API call
   *
   * @param {string} line Line Index value of cart Item (Starts from 1)
   * @param {integer} quantity Quantity to update
   */
  updateItemQty(line, quantity) {
    let lineItem = document.querySelector(`[data-cart-item="${line}"]`);
    if (lineItem) {
      lineItem.classList.add("updating");
    }
    var body = {};
    body[line] = quantity;
    body = JSON.stringify({ updates: body });

    fetch(`${routes.cart_update_url}`, { ...fetchConfig(), ...{ body } })
      .then((response) => {
        return response.text();
      })
      .then((state) => {
        this.getCartData();
        setTimeout(() => {
          if (lineItem) {
            lineItem.classList.remove("updating");
          }
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          if (lineItem) {
            lineItem.classList.remove("updating");
          }
        }, 1000);
        console.log(error);
      });
  }

  /**
   * Remove Item Event
   *
   * @param {event} Event instance
   */
  removeItem(event) {
    event.preventDefault();
    let currentTarget = event.currentTarget;
    let itemIndex = currentTarget.dataset.index || null;
    if (currentTarget.classList.contains("free-gift-with-purchase")) {
      window.sessionStorage.setItem("gwpRemoved", "true");
    }
    if (itemIndex != null) {
      this.updateItemQty(itemIndex, 0);
    }
  }

  /**
   * Cart Item Qunatity Increment/Decrement Button event
   *
   * @param {event} Event instance
   */
  manageQtyBtn(event) {
    event.preventDefault();
    let currentTarget = event.currentTarget;
    let action = currentTarget.dataset.for || "increase";
    let $qtyInput = currentTarget
      .closest("[data-qty-container]")
      .querySelector("[data-qty-input]");
    let itemIndex = $qtyInput.dataset.index || 1;
    let currentQty = parseInt($qtyInput.value) || 1;
    let finalQty = 1;

    if (action == "decrease" && currentQty <= 1) {
      return false;
    } else if (action == "decrease") {
      finalQty = currentQty - 1;
    } else {
      finalQty = currentQty + 1;
    }
    this.updateItemQty(itemIndex, finalQty);
  }

  /**
   * Cart Item Qunatity Input change event
   *
   * @param {event} Event instance
   */
  onQtyChange(event) {
    const $qtyInput = event.currentTarget;
    const qtyValue = $qtyInput.value;
    const itemIndex = $qtyInput.dataset.index || null;
    if (itemIndex) this.updateItemQty(itemIndex, qtyValue);
  }

  /**
   * Manage Cart Notes
   */
  cartNoteInput() {
    const cartNoteEle = document.querySelector('[data-cartNote] [name="note"]');
    if (!cartNoteEle) return;

    const cartNoteSave = document.querySelector("[data-saveNote]");
    let cartNoteEvents = ["input", "paste"];
    cartNoteEvents.forEach((eventName) => {
      cartNoteEle.addEventListener(
        eventName,
        () => {
          const defaultNote = cartNoteEle.dataset.default;
          if (defaultNote != cartNoteEle.value) {
            cartNoteSave.style.display = "block";
          } else {
            cartNoteSave.style.display = "none";
          }
        },
        false
      );
    });

    //  Cart Note Change event
    cartNoteSave.addEventListener("click", (e) => {
      e.preventDefault();
      const currentTarget = e.currentTarget;
      const cartNoteContainer = currentTarget.closest("[data-cartNote]");
      const cartNote = cartNoteContainer
        .querySelector('[name="note"]')
        .value.trim();
      if (cartNote.length <= 0) {
        alert("Add Note before proceeding");
        return;
      }
      const submitBtn = cartNoteContainer.querySelector("[data-saveNote]");
      const waitText = submitBtn.dataset.adding_txt
        ? submitBtn.dataset.adding_txt
        : "Saving...";
      submitBtn.innerHTML = waitText;
      submitBtn.disabled = true;
      this.updateCartNote(cartNoteContainer);
    });
  }

  /**
   * Update Cart Note
   * @param {element} cartNoteContainer
   */
  updateCartNote(cartNoteContainer) {
    const _this = this;
    const cartNoteEle = cartNoteContainer.querySelector('[name="note"]');
    const cartNote = cartNoteEle.value.trim();
    const resultEle = cartNoteContainer.querySelector("[data-resultMsg]");
    const submitBtn = cartNoteContainer.querySelector("[data-saveNote]");
    const defaultText = submitBtn.dataset.default
      ? submitBtn.dataset.default
      : "Save";

    let body = JSON.stringify({
      note: cartNote,
    });
    fetch(`${routes.cart_update_url}`, { ...fetchConfig(), ...{ body } })
      .then(function (data) {
        if (data.status == 200) {
          if (resultEle) {
            resultEle.innerText = "Added note to Order!";
            _this.manageResponseText(resultEle);
          }
          if (cartNoteEle) {
            cartNoteEle.dataset.default = cartNote;
          }
          submitBtn.style.display = "none";
          submitBtn.innerHTML = defaultText;
          submitBtn.disabled = false;
        } else {
          console.error("Request returned an error", data);
          if (resultEle) {
            resultEle.innerText = data;
            _this.manageResponseText(resultEle);
          }
          submitBtn.innerHTML = defaultText;
          submitBtn.disabled = false;
        }
      })
      .catch(function (error) {
        console.error("Request failed", error);
        if (resultEle) {
          resultEle.innerText = error;
          _this.manageResponseText(resultEle);
        }
        submitBtn.innerHTML = defaultText;
        submitBtn.disabled = false;
      });
  }

  /**
   * fade effect on reponse
   * @param {element} element
   */
  manageResponseText(element) {
    Utility.fadeEffect(element, "fadeIn");
    setTimeout(() => {
      Utility.fadeEffect(element, "fadeOut");
    }, 3000);
  }
}
customElements.define("ajax-cart", AjaxCart);

const gwpLocalCheck = "gwpAttemptAdd";
function getFromSessionStorage(key) {
  try {
    return sessionStorage.getItem(key);
  } catch (err) {
    console.error("Could not get item from storage with key", key, err);
  }
}

function setInSessionStorage(key, value) {
  try {
    sessionStorage.setItem(key.toString(), value.toString());
  } catch (err) {
    console.error(
      "Could not set item in storage with key, value",
      key,
      value,
      err
    );
  }
}

function removeFromSessionStorage(key) {
  try {
    sessionStorage.removeItem(key);
  } catch (err) {
    console.error("Could not remove item from storage with key", key, err);
  }
}

// Subscription Feature

document.addEventListener("DOMContentLoaded", initAll);
window.addEventListener("refreshAjaxCart", initAll);

function initAll() {
  document.querySelectorAll(".cart-item").forEach((item) => {
    const variantId = item.dataset.itemId;

    const sellingPlanCheckbox = item.querySelector(`.upsell__checkbox`);
    const sellingPlanOptions = item.querySelector(`.upsell__options`);

    if (
      sellingPlanCheckbox &&
      sellingPlanOptions &&
      !item.dataset.listenerAdded
    ) {
      sellingPlanCheckbox.addEventListener(
        "change",
        handleCheckboxChange.bind(null, sellingPlanCheckbox, sellingPlanOptions)
      );
      sellingPlanOptions.addEventListener(
        "change",
        handleOptionsChange.bind(null, sellingPlanCheckbox, sellingPlanOptions)
      );

      item.dataset.listenerAdded = true;
    }
  });
}

async function handleCheckboxChange(sellingPlanCheckbox, sellingPlanOptions) {
  const variantId = sellingPlanCheckbox.dataset.variantId;
  showOverlay();
  if (sellingPlanCheckbox.checked) {
    sellingPlanOptions.style.display = "block";
    await addOrUpdateSellingPlan(
      variantId,
      sellingPlanOptions.options[0].value
    );
  } else {
    sellingPlanOptions.style.display = "none";
    await removeSellingPlan(variantId, sellingPlanOptions.value);
  }

  // Refresh cart code
  document.querySelector("ajax-cart").getCartData();

  setTimeout(() => {
    hideOverlay();
  }, 1000);
}

async function handleOptionsChange(sellingPlanCheckbox, sellingPlanOptions) {
  const variantId = sellingPlanCheckbox.dataset.variantId;
  if (sellingPlanCheckbox.checked) {
    showOverlay();
    await addOrUpdateSellingPlan(variantId, sellingPlanOptions.value);

    // refresh Cart Code
    document.querySelector("ajax-cart").getCartData();

    setTimeout(() => {
      hideOverlay();
    }, 1000);
  }
}

async function addOrUpdateSellingPlan(variant, plan) {
  const cart = await getCart();
  const lineItemWithPlan = findLineItemWithPlan(cart, variant);
  const lineItemWithoutPlan = findLineItemWithoutPlan(cart, variant);
  let quantity;

  if (lineItemWithoutPlan) {
    quantity = lineItemWithoutPlan.quantity;
  } else if (lineItemWithPlan) {
    quantity = lineItemWithPlan.quantity;
  } else {
    quantity = 1;
  }

  const result = await addLineItemPlan(variant, plan, quantity);
  if (lineItemWithPlan) await removeLineItem(lineItemWithPlan.key);
  if (lineItemWithoutPlan) await removeLineItem(lineItemWithoutPlan.key);

  return result;
}

async function removeSellingPlan(variant, plan) {
  const cart = await getCart();
  const lineItemWithPlan = findLineItemWithPlan(cart, variant);

  if (lineItemWithPlan) {
    await removeLineItem(lineItemWithPlan.key);
    await addLineItem(variant, lineItemWithPlan.quantity);
  }
}

async function getCart() {
  const result = await fetch("/cart.json");
  if (result.status === 200) return result.json();
  throw new Error(
    `Failed to get request, Shopify returned ${result.status} ${result.statusText}`
  );
}

function findLineItemWithPlan(cart, variant) {
  return cart.items.find(
    (item) => item.id === parseInt(variant) && item.selling_plan_allocation
  );
}

function findLineItemWithoutPlan(cart, variant) {
  return cart.items.find(
    (item) => item.id === parseInt(variant) && !item.selling_plan_allocation
  );
}

function removeLineItem(key) {
  return postToShopify("cart/change.js", {
    id: key,
    quantity: 0,
  });
}

function addLineItemPlan(variant, plan, quantity) {
  return postToShopify("cart/add.js", {
    items: [
      {
        quantity: quantity,
        id: variant,
        selling_plan: plan,
      },
    ],
  });
}

function addLineItem(variant, quantity) {
  return postToShopify("cart/add.js", {
    items: [
      {
        quantity: quantity,
        id: variant,
      },
    ],
  });
}

function postToShopify(endpoint, formData) {
  return fetch(window.Shopify.routes.root + endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      console.log("Response:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function showOverlay() {
  document.getElementById("cart-overlay").style.display = "flex";
}

function hideOverlay() {
  document.getElementById("cart-overlay").style.display = "none";
}
