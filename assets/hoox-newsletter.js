const forms = document.querySelectorAll('.hoox-newsletter__form');

forms.forEach(function (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const parentFormContainer = form.closest('.hoox-shop__newsletter');
    const formNewsletterEmail = form.querySelector('.js-newsletter-email');
    const formButtonNewsletter = form.querySelector('.js-newsletter-button');
    const newsletterInputValue = formNewsletterEmail.value;

    if (isEmailValid(newsletterInputValue)) {
      fetch('https://manage.kmail-lists.com/ajax/subscriptions/subscribe', {
        method: 'POST',
        headers: {
          accept: 'application/json, text/plain, */*',
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: new URLSearchParams({ g: 'Rg6kFQ', email: newsletterInputValue }),
      })
        .then(function (response) {
          if (response.ok) {
            formButtonNewsletter.disabled = false;
            formNewsletterEmail.value = '';
            parentFormContainer.classList.add('success');

            forms.forEach(function (otherForm) {
              if (otherForm !== form) {
                const otherParent = otherForm.closest('.hoox-shop__newsletter');
                otherParent.classList.add('submitted');
              }
            });
          } else {
            formNewsletterEmail.value = '';
            formButtonNewsletter.disabled = true;
            parentFormContainer.classList.remove('success');
            parentFormContainer.classList.add('error');
          }
        })
        .catch(function (error) {
          formNewsletterEmail.value = '';
          formButtonNewsletter.disabled = true;
          parentFormContainer.classList.add('error');
        });
    } else {
      formNewsletterEmail.value = '';
      formButtonNewsletter.disabled = true;
      parentFormContainer.classList.remove('success');
      parentFormContainer.classList.add('error');
    }
  });
});

function isEmailValid(email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
}

const body = document.querySelector('body');
const popupNewsletter = document.querySelector('.hoox-popup');
const closeButton = document.querySelector('.hoox-popup__close');
const outsideClick = document.querySelector('.hoox-popup__outside');

function showNewsletterPopup() {
  if (popupNewsletter) {
    popupNewsletter.style.display = 'flex';
    body.style.setProperty('overflow', 'hidden', 'important')
  }
}

function closeNewsletterPopup() {
  popupNewsletter.style.display = 'none';
  body.style.setProperty('overflow', 'unset', 'important')
}
if (popupNewsletter) {

  closeButton.addEventListener('click', closeNewsletterPopup);

  outsideClick.addEventListener('click', function (e) {
    if (e.target === outsideClick) {
      closeNewsletterPopup();
    }
  });

}

window.addEventListener('load', function () {
  setTimeout(showNewsletterPopup, 5000);
});

