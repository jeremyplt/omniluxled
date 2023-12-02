$(document).ready(function() {
    function open(flag) {
        var tablinks = $(".tablink");
        var tabcontents = $(".tabcontent ");
        var openedIdx = 0;

        for(var i = 0; i < tablinks.length; i++){
            if($(tablinks[i]).hasClass("open")) {
                openedIdx = i;
                break;
            }            
        }
        
        $(tablinks[openedIdx]).removeClass("open")
        $(tabcontents[openedIdx]).removeClass("open")

        var nextIdx = 0
        if(flag) {
            if(openedIdx == tablinks.length - 1) {
                nextIdx = 0
            } else {
                nextIdx = openedIdx + 1;
            }
        } else {
            if(openedIdx == 0) {
                nextIdx = tablinks.length - 1
            } else {
                nextIdx = openedIdx - 1;
            }
        }

        console.log(nextIdx)
        $(tablinks[nextIdx]).addClass("open")
        $(tabcontents[nextIdx]).addClass("open")

        var width = $(".swiper-wrapper.board-tabs .swiper-slide.carousel-cell")[0].style.width;
        var offset = nextIdx * parseInt(width);
        console.log("offset =", offset)

        $(".swiper-wrapper.board-tabs").css("transform", "translate3d(-" + offset + "px, 0px, 0px)")

    }

    $(".slider-reviews-prev").click(function(){
        open(false);
    });    
    $(".slider-reviews-next").click(function(){
        open(true);
    });        
});