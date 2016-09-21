$(document).ready(function() {
    
    
    var nav = $(".nav");
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();
    var maclogo = document.getElementById("maclogo");
    var scrollButton = document.getElementById("scrollbutton");
    document.addEventListener("scroll", function(){
        scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scrollTop > windowHeight){
            nav.addClass("fix-nav");
        } else {
            nav.removeClass("fix-nav");
            
            
            
        }
    });
    
    
    scrollButton.addEventListener("click", function(){
        var body=$("html, body");
        body.animate({scrollTop:$(window).height()},'500','swing');
    });
    scrollButton.addEventListener("mouseover", function(){
        $(scrollButton).removeClass("no-startup-animations");
    });
    
});