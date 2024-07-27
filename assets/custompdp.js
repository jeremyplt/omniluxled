$(document).ready(function() {
 
  $(".toggleingredients").click(function(event) {
    event.preventDefault();
    var target = $(this).data("target");
    $("#" + target).toggle("fast"); // Adjust the speed by changing "slow" to a specific duration, e.g., "2000" for 2 seconds
    $(this).text(function(_, text) {
      return text === "+ View all ingredients" ? "- View all ingredients" : "+ View all ingredients";
    });
  });
});



/*
* Product Page
* Manual BIS Popup
*/
const manualBISpopup = document.querySelector('.manual-bis-popup');

if (manualBISpopup) {
  // Open and close manual BIS popup
  const manualBIStrigger = document.querySelectorAll('.manual-bis-trigger');
  const manualBIScloseBtns = manualBISpopup.querySelectorAll('[data-close-modal]');
  const manualBISform = manualBISpopup.querySelector('form');

  if (manualBIStrigger) {
    manualBIStrigger.forEach(element => {
      element.addEventListener('click', function(event){
        event.preventDefault();
        manualBISpopup.querySelector(".manual-bis-message").textContent = '';
        manualBISpopup.querySelector(".manual-bis-success").classList.add("hidden");

        var productTitle = element.dataset.prod_title
        var productID = element.dataset.prod_id
        var variantID = element.dataset.var_id
        manualBISpopup.querySelector('.manual-bis-popup__product').textContent = productTitle
        manualBISpopup.querySelector('[name="product"]').value = productID
        manualBISpopup.querySelector('[name="variant"]').value = variantID
        manualBISform.querySelector('[name="email"]').value = '';

        manualBISpopup.classList.remove('hidden');
        $(manualBISpopup).fadeIn(200);
      })
    });
  }

  if (manualBIScloseBtns.length > 0) {
    manualBIScloseBtns.forEach(function(manualBISclose){
      manualBISclose.addEventListener('click', function(){
        $(manualBISpopup).fadeOut(200);

        const manualBISSuccess = document.querySelector('.manual-bis-popup__success');
        if (manualBISSuccess) {
          manualBISSuccess.parentNode.removeChild(manualBISSuccess);
        }
        // Add button back to the form
        manualBISpopup.querySelector('.btn--submit').style.display = 'block';
      })
    })
  }

  // Submit manual BIS form
  if (manualBISform) {
    manualBISform.addEventListener('submit', function(e){
      e.preventDefault();

      const accountID = manualBISform.querySelector('[id="manual-bis-account"]').value;
      const email = manualBISform.querySelector('[id="manual-bis-email"]').value;
      const variantID = parseInt(manualBISform.querySelector('[id="manual-bis-variant"]').value);
      const productID = manualBISform.querySelector('[id="manual-bis-product"]').value;
      const subscribe = manualBISform.querySelector('[id="subscribe_for_newsletter"]').checked;
  const listID = manualBISform.querySelector('[id="manual-bis-list-id"]').value;



      const isValid = Utility.validateEmail(email);



      if (!isValid) return;



      console.log(subscribe);

      const data = {

        a: accountID,

        email: email,

        variant: variantID,

        product: productID,

        platform: 'shopify',

        subscribe_for_newsletter: true,

        g: listID

      };
       console.log(data);
      /*
      fetch(`https://a.klaviyo.com/onsite/components/back-in-stock/subscribe`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((response) => {
          console.log(response);
          if (response.message) {
              manualBISpopup.querySelector(".manual-bis-message").textContent = response.message;
          }
          if (response.success) {
              manualBISpopup.querySelector(".manual-bis-success").classList.remove("hidden");
          }
      })
      .catch((e) => {
          console.error(e);
      })
      .finally(() => {
          e.submitter.classList.remove("loading");
      });
      */

        $.ajax({
          type: 'POST',
          url: 'https://a.klaviyo.com/onsite/components/back-in-stock/subscribe',
          data: data,
        })
        .done(function(response){
          console.log(response);
          if (response.message) {
              manualBISpopup.querySelector(".manual-bis-message").textContent = response.message;
          }
          if (response.success) {
              manualBISpopup.querySelector(".manual-bis-success").classList.remove("hidden");
          }

        });

        if ( subscribe ) {
          //document.getElementById('bis-klaviyo-email').querySelector('input[type="email"]').value = email;
          simulateInput(document.getElementById('bis-klaviyo-email').querySelector('input[type="email"]'), email);
          document.getElementById('bis-klaviyo-email').querySelector('input[type="submit"]').click();
        }

    })
  }
}

function simulateInput(element, text) {
  // Iterate over each character in the text
  for (var i = 0; i < text.length; i++) {
    // Create a new keyboard event
    var event = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: text[i]
    });
    
    // Dispatch the keyboard event on the input element
    element.dispatchEvent(event);

    // Set the value of the input element to the current text
    element.value += text[i];

    // Create and dispatch an 'input' event on the input element
    var inputEvent = new Event('input', {
      bubbles: true,
      cancelable: true
    });
    element.dispatchEvent(inputEvent);

    // Create and dispatch a 'keyup' event on the input element
    var keyupEvent = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true,
      key: text[i]
    });
    element.dispatchEvent(keyupEvent);
  }
}