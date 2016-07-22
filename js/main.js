$(document).ready(function() {
    var wrap = $(".intro-overlay");
    var nav = $(".nav");
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height() - 5;

    $(document).on("scroll", function(e){
        scrollTop = $(window).scrollTop();
        windowHeight = $(window).height() - 5;
        if (scrollTop > windowHeight){
            nav.addClass("fix-search");
        } else {
            nav.removeClass("fix-search");
        }
    });
});