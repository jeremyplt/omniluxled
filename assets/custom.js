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

