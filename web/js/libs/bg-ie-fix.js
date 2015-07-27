

var initIeBg = function () {
    var blocks = $('[data-ie-bg]');
    if (blocks.length && BrowserDetect.browser == "Explorer") {
        blocks.each(function () {
            var elem = $(this);
            var fullProp = elem.css('background-image');
            var imgUrl = fullProp.substring(5, fullProp.length-2);
            console.log(imgUrl);
            console.log(imgUrl);
            $("<img src='"+imgUrl+"' class='ie8-bg'/>").prependTo(elem);
        });
        blocks.css({
            background: 'none',
            position: 'relative'
        });
        $('.ie8-bg').css({
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: 'auto',
            zIndex: '-1'
        })
    }
};

$(document).ready(function(){
    initIeBg();
});


