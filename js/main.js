$(document).ready(function() {
    var wrap = $(".intro-overlay");
    var nav = $(".nav");
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height() + 15;

    $(document).on("scroll", function(e){
        scrollTop = $(window).scrollTop();
        windowHeight = $(window).height() + 15;
        if (scrollTop > windowHeight){
            nav.addClass("fix-search");
            console.log("this first thing");
        } else {
            nav.removeClass("fix-search");
            console.log("this second thing");
        }
    });
});