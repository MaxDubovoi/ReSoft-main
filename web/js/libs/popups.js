var duration = 600;

var visible_popup = '';
var document_scroll;

function initPopup(popup){
    var close       = popup.find('.close');
    close.click(hidePopup);
    $('#back, .close-popup').click(hidePopup);

    $('.popup_holder').hide().removeClass('none');
    $(popup).hide().removeClass('none');
}
function hidePopup(){
    $('.popup_holder').fadeOut(duration,function(){
        $('.popup.act').removeClass('act').hide();
        $('.wrapper').scrollTop(0);
        $('body').removeClass('body_popup');
        $(window).scrollTop(document_scroll);
    });
}
function showPopup(popup){
    if ( $(popup).hasClass('act') ) return false;
    if( $('body').hasClass('body_popup') ){
        // we have active popup
        $('.popup.act').fadeOut(duration,function(){
            $(popup).fadeIn(duration);
            $(popup).addClass('act');
        });
        $('.popup.act').removeClass('act');
    } else {
        // no visible popup
        document_scroll = $(window).scrollTop();
        $('body').addClass('body_popup');
        $('.wrapper').scrollTop(document_scroll);
        $(window).scrollTop(0);

        $(popup).show().addClass('act');
        $('.popup_holder').stop(1,1).fadeIn(duration);
    }

}


$(document).ready(function() {

    if( $('.no-svg img[data-svg]').length ){
        $('.no-svg img[data-svg]').each(function(i, el){
            var re = /.svg$/;
            var new_src = $(el).attr('src').replace(re, "") +'.'+ $(el).data('svg');
            $(el).attr('src',new_src);
        });
    }


    // init popups
    if( $('.popup').length ){
        $('.popup').each(function(index, item){
            initPopup($(item));
        });

        if( visible_popup.length ){
            showPopup($('.'+visible_popup));
        }

        // popup btns
        $('[data-popup]').click(function(e){
            e.preventDefault();
            var popup_class = $(this).data('popup');
            showPopup($('.'+popup_class));
        });
    }





});