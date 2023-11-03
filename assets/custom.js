function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    var scrollToReviewsSpan = document.getElementById("scrollToReviews");
    
    scrollToReviewsSpan.addEventListener("click", function() {
        var reviewsSection = document.querySelector(".js-oke-widgetSize.oke-is-large, .js-oke-widgetSize.oke-is-small");
        
        if (reviewsSection) {
            // Scroll smoothly to the reviews section
            reviewsSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });

    waitForElm('.product-details-wrapper [data-oke-metafield-data]').then((elm) => {
        const metafield = jQuery.parseJSON(elm.textContent);
        if(metafield.reviewCount == 0) {            
            $('.product-details-wrapper [data-oke-star-rating]').css({display:'none'});
            $('.trustedbypdp').css({display:'none'});
        } else {
            console.log("ttt")
            $('.product-details-wrapper [data-oke-star-rating]').css({display:'block'});
            $('.trustedbypdp').css({display:'block'});
        }
    })
});



const customSelectors = {};

const menuLinks = document.querySelectorAll('.mega_menu_hover_line');
const subMenuContnets= document.querySelectorAll('.sub_menu');
menuLinks.forEach(menuLink => {
    menuLink.addEventListener('mouseover', function (e) {
        const element = e.target;
        menuLinks.forEach(menuLink => {
            menuLink.classList.remove('mega-menu__link--active');
        });
        element.classList.add('mega-menu__link--active');
        const menu_title = e.target.title;  
        if (menu_title != "Shop All Products") {
            subMenuContnets.forEach(subMenuContnet => {
                subMenuContnet.classList.remove('active');
                const handle = subMenuContnet.getAttribute("data-menu-title");
                if (handle == menu_title) {
                    subMenuContnet.classList.add('active');
                }
            })
        }
    })
})

const inputElement = document.querySelector('.docapp-coupon-input--input');
inputElement.setAttribute('placeholder', '+ ENTER DISCOUNT CODE');


// THIS FILE IS NOT USED ANYMORE