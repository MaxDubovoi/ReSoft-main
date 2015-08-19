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
var sliderHolder = $('.company-info-slider-holder');
var sliderHolderTop = sliderHolder.offset().top;
var iconLogo=$('.icon-resoft-logo');
var slider = $('.company-info-slider');
var windowHeight = $(window).height();
var windowWidth = $(window).width();
var slides = $(sliderHolder.find('.slide'));
var activeSlideIndex = 0;
var slidesNum = $(sliderHolder.find('.slide')).length;
var wrap = $('.main');
var footerAnimation=false;// fix scroll footer in FF
var delta = 0;
var slideHeight = $('.slide').height();

var initCompanyInfoSlider = function () {

    var footerBlock = $('.footer-block');
    var headerBlockHeight = $('.bg-picture').height();
    console.log(headerBlockHeight);
    sliderHolder.removeClass('rel').css({
        top: 0
    });

    body.css({
        height: (windowHeight*(slidesNum)) + +headerBlockHeight + +footerBlock.height()
    });


    slides.css({
        height: 0,
        width: windowWidth
    });


    slides.eq(0).css({
        height: windowHeight
    }).addClass('is-active');
    var beforeScroll=0, afterScroll;
    footerBlock.css({
        top: windowHeight*(slidesNum) + +headerBlockHeight,
        position: 'relative'


    });


    var scrollHandler = function (e) {

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
        body.css({
            height: (windowHeight*(slidesNum)) + +headerBlockHeight + +footerBlock.height()
        });
        footerBlock.css({
            top: windowHeight*(slidesNum) + +headerBlockHeight,
            position: 'relative'
        });


        var _top = $(window).scrollTop();
        afterScroll=_top;
        windowHeight = $(window).height();

        if (_top >= headerBlockHeight ){

            sliderHolder.removeClass('rel').addClass('fixed').css({
                top:0
            });
            iconLogo.addClass('visible');

            sliderHolder.addClass('fixed');
            slides.removeClass('is-active').eq(activeSlideIndex+1).addClass('is-active');
            slides.eq(activeSlideIndex+1).css({

                height: _top - headerBlockHeight - (windowHeight * activeSlideIndex+1)
            });
           if (_top >= windowHeight * activeSlideIndex + +headerBlockHeight && _top <= (windowHeight * (activeSlideIndex + +1)) + +headerBlockHeight)
           {

           } else {
                if (((beforeScroll-afterScroll>0)&& (_top<=windowHeight * activeSlideIndex + +headerBlockHeight)))  { //scroll to top
                    activeSlideIndex--;
                } else if ((beforeScroll-afterScroll<0)&& (_top>=windowHeight * activeSlideIndex + +headerBlockHeight )){ //scroll to bottom
                    activeSlideIndex++;
                }
            }
            beforeScroll=afterScroll;
        } else {
            iconLogo.removeClass('visible');
            sliderHolder.removeClass('fixed');
            beforeScroll=afterScroll;
        }
        if (_top+windowHeight>=footerBlock.offset().top)
        {
            console.log('enter to scroll = '+_top);
            sliderHolder.removeClass('fixed').addClass('rel').css({

                top: (headerBlockHeight+ +windowHeight*(slidesNum-1))
            });
            if(BrowserDetect.browser=='Firefox')
            {
                scrollFooterFirefox();//scroll footer fix for FF
            }

/*
            if(delta<0&&BrowserDetect.browser=='Firefox' )
            {
                var slideHeight = $('.slide').height();
                var topScrollDistance =slideHeight  * (slidesNum-1) + +sliderHolderTop;
                body.animate({scrollTop: topScrollDistance}, 1000);
            }
            if(delta>0&&BrowserDetect.browser=='Firefox')
            {
                body.animate({scrollTop: body.height()}, 1000);
            }
            */
        }
        if(_top<=headerBlockHeight)
        {
            slides.eq(activeSlideIndex+1).css({
                height: 0
            });
        }


    };
    $(window).bind('mousewheel DOMMouseScroll', scrollHandler).bind('scroll', scrollHandler);

};
var scrollViaMenu = function(){
    var nav = $(".navigation");
    var navLink = $(nav).find('a');
    var sliderHolderTop=sliderHolder.offset().top;
    var slideHeight = $('.slide').height();

    navLink.on("click", function (e) {
        e.preventDefault();
        var elem = $(this);
        var dataScrollTo = elem.attr('data-scroll-to-slide');
        var topScrollDistance = slideHeight * (dataScrollTo - 1) + +sliderHolderTop;
        body.animate({scrollTop: topScrollDistance}, 1500);
    });
};


var scrollFooterFirefox = function(){
    if(footerAnimation)
    {
        footerAnimation=false;
        return 0;
    }
    else
    {
        if(delta<0)
        {
            var slideHeight = $('.slide').height();
            var topScrollDistance =slideHeight  * (slidesNum-1) + +sliderHolderTop;
            body.animate({scrollTop: topScrollDistance},100);
            footerAnimation=true;
            return 0;
        }
        else if(delta>0)
        {
            body.animate({scrollTop: body.height()}, 100);
            footerAnimation=true;
            return 0;
        }
    }

};
var contentResize = function() {

    var _top = $(window).scrollTop();
    var headerBlockHeight = $('.bg-picture').height();
    var footerBlock = $('.footer-block');
    slideHeight = $('.slide').height();
    windowWidth = $(window).width();
    console.log(windowWidth);
    windowHeight = $(window).height();
    if ((windowWidth) < 980) {
        windowWidth=980;
        footerBlock.css({
            width: windowWidth
        });

    }
    else
    {
        footerBlock.css({
            width: 100+'%'
        });
    }
    slides.css({
        width: windowWidth
    });
    slides.eq(activeSlideIndex + 1).css({
        height: _top - headerBlockHeight - (windowHeight * activeSlideIndex + 1)
    });
    for (var i = 0; i <= activeSlideIndex; i++) {
        slides.eq(i).css({
            height: windowHeight
        })
    }
};
    $(window).resize(function() {
        contentResize();


    });
    $(window).load(function(){
    $('html, body').scrollTop(0);
    initCompanyInfoSlider();
        contentResize();
});

$(document).ready(function(){
    initCompanyInfoSlider();
    scrollViaMenu();
    contentResize();
});


