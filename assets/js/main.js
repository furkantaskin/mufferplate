$( document ).ready(function() {

    $(window).resize(function() {
        if ($(window).width() >= 993) {
        } else{
            $(".mobileMenu").html($("header .navbar").html());
            $(".menuButton").click(function () {
                $(".mobileMenu, .menuButton, body").toggleClass("menuActive");
            });
        }
    });


    $(window).trigger("resize");


});


