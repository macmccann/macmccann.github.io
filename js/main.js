$(document).ready(function() {
    var wrap = $(".intro-overlay");
    var nav = $(".nav");
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();

    $(document).on("scroll", function(e){
        scrollTop = $(window).scrollTop();
        windowHeight = $(window).height();
        if (scrollTop > windowHeight){
            nav.addClass("fix-search");
        } else {
            nav.removeClass("fix-search");
        }
    });
});