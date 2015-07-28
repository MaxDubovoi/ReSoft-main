var duration = 300;
var body = $('html, body');

var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) !== -1) {
                return data[i].identity;
            }
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) {
            return;
        }

        var rv = dataString.indexOf("rv:");
        if (this.versionSearchString === "Trident" && rv !== -1) {
            return parseFloat(dataString.substring(rv + 3));
        } else {
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        }
    },

    dataBrowser: [
        {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
        {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
        {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
        {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
        {string: navigator.userAgent, subString: "Safari", identity: "Safari"},
        {string: navigator.userAgent, subString: "Opera", identity: "Opera"}
    ]

};

BrowserDetect.init();
//document.write("You are using <b>" + BrowserDetect.browser + "</b> with version <b>" + BrowserDetect.version + "</b>");
/*var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};*/

//if(!isMobile.any()) {
//
//}

var initCompanyInfoSlider = function () {
    var sliderHolder = $('.company-info-slider-holder');
    var footerBlock = $('.footer-block');
    var slides = $(sliderHolder.find('.slide'));

    var slidesNum = $(sliderHolder.find('.slide')).length;

    var headerBlockHeight = $('.header-block').height();
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();

    var sliderHolderTop = sliderHolder.offset().top;

    body.css({
        height: (windowHeight*(slidesNum+1)) + headerBlockHeight
    });


    //КОСТЫЛЬ
    footerBlock.css({
        top: (windowHeight*(slidesNum+1)) + headerBlockHeight,
        position: 'absolute'
    });

    slides.css({
        height: 0,
        width: windowWidth
    });


    slides.eq(0).css({
        height: ''
    }).addClass('is-active');

    var activeSlideIndex = 0;
    var scrollHandler = function (e) {
        var delta = 0;

        if (typeof e.originalEvent.deltaY != "undefined") {
            // regular browsers
            delta = e.originalEvent.deltaY;
        }
        if (BrowserDetect.browser=='Firefox') {
            // FF
            delta = e.originalEvent.detail * 50;
        }
        if (BrowserDetect.browser=='Explorer'){
            // IE
            delta = -1 * e.originalEvent.wheelDelta;
        }

        var _top = $(window).scrollTop();

        if (_top >= sliderHolderTop) {
            sliderHolder.addClass('fixed');
            slides.removeClass('is-active').eq(activeSlideIndex).addClass('is-active');
            slides.eq(activeSlideIndex).css({
               // height:0,
                height: _top - sliderHolderTop - (windowHeight * activeSlideIndex)
            });

            if (_top >= windowHeight * activeSlideIndex + +sliderHolderTop && _top <= (windowHeight * (activeSlideIndex + +1)) + +sliderHolderTop) {

            } else {
                if (delta < 0) { //scroll to top
                    activeSlideIndex--;
                } else if (delta > 0) { //scroll to bottom
                    activeSlideIndex++;
                }
            }
        } else {
            sliderHolder.removeClass('fixed');
        }
        // КОСТЫЛЬ
        if (_top >= body.height() )
            sliderHolder.removeClass('fixed');

    };
    $(window).bind('mousewheel DOMMouseScroll', scrollHandler).bind('scroll', scrollHandler);

};


$(document).ready(function(){
    initCompanyInfoSlider();
});


