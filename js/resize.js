$(function(){   
    let width = $(document).width();
    $(window).on('resize', function() {        
        var width = $(window).width();
        if (width < 750){
            $('#bottom-section').removeClass('col-span-2').addClass('col-span-4');
            $('#top-section').removeClass('col-span-2').addClass('col-span-4').addClass('grid');
            $('.menu-bar').show();
            $('#accordion').collapsible({
                collapsible: true,
                heightStyle: "content",
                navigation: true,
                active: true
              });
        }else if(width > 750 ){
            $('#accordion').collapsible({
                collapsible: false,
                heightStyle: "content",
                navigation: false,
                active: false
              });
            $('.menu-bar').hide();
            $('#bottom-section').addClass('col-span-2').removeClass('col-span-4');
            $('#top-section').removeClass('col-span-4').removeClass('grid').addClass('col-span-2');
        }else{
            
        }
    });
    $(window).ready(function() {        
        if (width < 750){
            $('.menu-bar').show();
            $('#accordion').collapsible({
                collapsible: true,
                heightStyle: "content",
                navigation: true,
                active: true
              });
            $('#bottom-section').removeClass('col-span-2').addClass('col-span-4');
            $('#top-section').removeClass('col-span-2').addClass('col-span-4').addClass('grid');
        }else{
            $('.menu-bar').hide();
            $('#bottom-section').addClass('col-span-2').removeClass('col-span-4');
            $('#top-section').removeClass('col-span-4').removeClass('grid').addClass('col-span-2');
        }
    });
 

});

