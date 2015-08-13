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
var iconLogo=$('.icon-resoft-logo');
var slider = $('.company-info-slider');
var windowHeight = $(window).height();
var windowWidth = $(window).width();
var slides = $(sliderHolder.find('.slide'));
var activeSlideIndex = 0;
var slidesNum = $(sliderHolder.find('.slide')).length;

var initCompanyInfoSlider = function () {

    var footerBlock = $('.footer-block');




    var headerBlockHeight = $('.bg-picture').height();
    console.log(headerBlockHeight);


    var sliderHolderTop = sliderHolder.offset().top;

    body.css({
        height: (windowHeight*(slidesNum)) + headerBlockHeight + footerBlock.height()
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
        top: windowHeight*(slidesNum) + headerBlockHeight,
        position: 'relative'


    });


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
        afterScroll=_top;
        windowHeight = $(window).height();
       /* body.css({
            height: (windowHeight*(slidesNum-1)) + headerBlockHeight + footerBlock.height()
        });*/

        if (_top >= headerBlockHeight ){
            iconLogo.addClass('visible');

            sliderHolder.addClass('fixed');
            slides.removeClass('is-active').eq(activeSlideIndex+1).addClass('is-active');
            slides.eq(activeSlideIndex+1).css({

                height: _top - headerBlockHeight - (windowHeight * activeSlideIndex+1)
            });

           if (_top >= windowHeight * activeSlideIndex + +headerBlockHeight && _top <= (windowHeight * (activeSlideIndex + +1)) + +headerBlockHeight) {


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
        // КОСТЫЛЬ
        if (_top+windowHeight>=footerBlock.offset().top)
        {
            /*console.log('windowHeight='+windowHeight);
            console.log('footerBlock.offset().top'+footerBlock.offset().top);
            console.log('headerBlockHeight'+headerBlockHeight);
            console.log('_top+windowHeight'+ +(_top+windowHeight));//так как нужно сместить на высоту 8-ми слайдеров
            */
           sliderHolder.removeClass('fixed').addClass('rel').css({

               top: (headerBlockHeight+windowHeight*(slidesNum-1))

            });
        }
        else{


            if (_top >= headerBlockHeight ) {
                sliderHolder.removeClass('rel').addClass('fixed').css({
                    top:0
                });
                slides.removeClass('is-active').eq(activeSlideIndex+1).addClass('is-active');
                slides.eq(activeSlideIndex+1).css({

                    height: _top - headerBlockHeight - (windowHeight * activeSlideIndex+1)
                });

            }
        }


        if(_top<=headerBlockHeight)
        slides.eq(activeSlideIndex+1).css({

            height: 0
        });
       /* footerBlock.css({
            //top: windowHeight*(slidesNum-1) + headerBlockHeight,
            top: body.height() - footerBlock.height(),
            position: 'relative'


        });*/
        $(window).resize(function(){
            console.log('resize');
            headerBlockHeight = $('.bg-picture').height();

            sliderHolderTop = sliderHolder.offset().top;
            console.log('headerBlockHeight='+headerBlockHeight);

            body.css({
                height: (windowHeight*(slidesNum)) + headerBlockHeight + footerBlock.height()
            });
           windowHeight = $(window).height();
            slides.css({
                width: $(window).width()
            });
            slides.eq(activeSlideIndex+1).css({
                height: _top - headerBlockHeight - (windowHeight * activeSlideIndex+1)
            });
            for(var i=0;i<=activeSlideIndex;i++)
            {
                slides.eq(i).css({
                    height: windowHeight
                })
            }
            //КОСТЫЛЬ
            footerBlock.css({
                top: windowHeight*(slidesNum-1) + headerBlockHeight,
                position: 'relative'
            });
        })


    };
    $(window).bind('mousewheel DOMMouseScroll', scrollHandler).bind('scroll', scrollHandler);

};
var scrollViaMenu = function(){

    $(".navigation").on("click","a", function (event) {

        //отменяем стандартную обработку нажатия по ссылке

        event.preventDefault();
        var currentSlide;
        var position;
        var i;

        var id  = $(this).attr('href');
        for(i=0;i<slidesNum;i++)
        {
            console.log('id='+slides.eq(i).attr('id'));
            console.log('this href='+id);

            if(slides.eq(i).attr('id') ==id)
            {   currentSlide = i;
                console.log('проверка');
                break;
            }
        }

        console.log('currentSlide='+currentSlide);

        //узнаем высоту от начала страницы до блока на который ссылается якорь
        position = sliderHolder.offset().top+ +(windowHeight*currentSlide);
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: position+'px'}, 1500);
    });
};

$(window).load(function(){
    $('html, body').scrollTop(0);
});

$(document).ready(function(){
    initCompanyInfoSlider();
    scrollViaMenu();
});


