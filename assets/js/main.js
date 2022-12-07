$( document ).ready(function() {

    $(window).resize(function() {
        if ($(window).width() >= 993) {
            $("body").on('mouseleave', '.pageBanner .categories:not(.maincats)', function() {
                $(this).children().not(".active").removeClass('show');
            });
            $(".pageBanner .categories.maincats .category").addClass("show")
        } else{
            $(".pageBanner .categories .category:not(.active)").addClass('show');
            $(".mobileMenu").html($("header .navbar").html());
            $(".menuButton").click(function () {
                $(".mobileMenu, .menuButton, body").toggleClass("menuActive");
            });
            $(".categories").animate({
                    scrollLeft: $(".categories .category.active").position().left,
                behavior: 'smooth'
                }, 1000);
        }
    });


    $(window).trigger("resize");


});


