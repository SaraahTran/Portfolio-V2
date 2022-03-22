const pageValues = {
    rotationDegree: 0,
    direction: 'up',
    pageOrder: ['home', 'projects', 'projects2', 'about', 'projects4'],
    logStyles: [
        'background: linear-gradient(45deg, #F800FF 0%, #3100FF 100%)'
        , 'color: white'
        , 'border-radius: 3px'
        , 'display: block'
        , 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)'
        , 'padding: 25px 50px'
        , 'font-size: 25px'
        , 'line-height: 40px'
        , 'text-align: center'
        , 'font-weight: bold'
    ].join(';')
};




//Button

$( ".button_su_inner" ).mouseenter(function(e) {
    var parentOffset = $(this).offset(); 
   
    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;
    $(this).prev(".su_button_circle").css({"left": relX, "top": relY });
    $(this).prev(".su_button_circle").removeClass("desplode-circle");
    $(this).prev(".su_button_circle").addClass("explode-circle");
 
 });
 
 $( ".button_su_inner" ).mouseleave(function(e) {
 
      var parentOffset = $(this).offset(); 
 
      var relX = e.pageX - parentOffset.left;
      var relY = e.pageY - parentOffset.top;
      $(this).prev(".su_button_circle").css({"left": relX, "top": relY });
      $(this).prev(".su_button_circle").removeClass("explode-circle");
      $(this).prev(".su_button_circle").addClass("desplode-circle");
 
 });
 
 
 var window_height;
 var header_height;
 var doc_height;
 var posTop_s1;
 var posBottom_s1;
 var posTop_s2;
 var posBottom_s2;
 $( document ).ready(function() {
     getValues();
 });
 
 $(window).scroll(function (event) {
     var scroll = $(window).scrollTop();
   
     
     if(scroll < posTop_s1){
       $('.sticky').removeClass('fixy');
       $('.sticky').removeClass('bottom');
     }
   
     if(scroll > posTop_s1){
       $('.sticky').removeClass('fixy');
       $('.sticky').removeClass('bottom');
       $('#s1 .sticky').addClass('fixy');
     }
     if(scroll > posBottom_s1 ){
       $('.sticky').removeClass('fixy');
       $('.sticky').removeClass('bottom');
       $('#s1 .sticky').addClass('bottom');
       $('.bottom').css({'max-height': window_height+'px'}); 
     }
   
     if(scroll > posTop_s2 && scroll < posBottom_s2){
       $('.sticky').removeClass('fixy');
       $('.sticky').removeClass('bottom');
       $('#s2 .sticky').addClass('fixy');
     }
       
 });
 
 function getValues(){
   window_height = $(window).height();
   doc_height = $(document).height();
   header_height = $('header').height(); 
   
   //get heights first
   var height_s1 = $('#s1').height();
   var height_s2 = $('#s2').height();
   
   //get top position second
   posTop_s1 = header_height;  
   posTop_s2 = posTop_s1 + height_s1;
   
   //get bottom position 3rd
   posBottom_s1 = posTop_s2 - header_height;
   posBottom_s2 = doc_height;
 }
 
 
 var rtime;
 var timeout = false;
 var delta = 200;
 $(window).resize(function() {
     rtime = new Date();
     if (timeout === false) {
         timeout = true;
         setTimeout(resizeend, delta);
     }
 });
 
 function resizeend() {
     if (new Date() - rtime < delta) {
         setTimeout(resizeend, delta);
     } else {
         timeout = false;
        getValues();
     }               
 }
 

const pageMethods = {
    spinMenu: function () {
        if (pageValues.rotationDegree == 360) {
            pageValues.direction = 'down';
        } else if (pageValues.rotationDegree == 0) {
            pageValues.direction = 'up';
        };
        if (pageValues.direction == 'down') {
            pageValues.rotationDegree-=90;
        } else if (pageValues.direction == 'up') {
            pageValues.rotationDegree+=90;
        };
        document.querySelector(domStrings.leftMenu).style.transform = `translateY(-50%) rotate(-${pageValues.rotationDegree}deg)`;
        document.querySelector(domStrings.rightMenu).style.transform = `translateY(-50%) rotate(${pageValues.rotationDegree}deg)`;
    },
    successNotification: function () {
        document.querySelector(domStrings.notification).style.opacity = "1";
        document.querySelector(domStrings.notification).style.zIndex = "100";
    },
    enlargeImage: function (imageDom) {
        document.querySelector(domStrings.enlargeImage).src = imageDom.getAttribute("src");
        document.querySelector(domStrings.enlargeSection).style.opacity = '1';
        document.querySelector(domStrings.enlargeSection).style.zIndex = '2000';
    },
    closeEnlarge: function () {
        document.querySelector(domStrings.enlargeSection).style.opacity = '0';
        document.querySelector(domStrings.enlargeSection).style.zIndex = '-1';
    },
    openMenu: function () {
        document.querySelector(domStrings.navigationMenuBackground).classList.add('fullscreen');
        document.querySelector(domStrings.closeFullMenu).style.visibilty = 'visible';
        document.querySelector(domStrings.navigationMenu).style.zIndex = '1000';
        document.querySelector(domStrings.navigationMenu).style.visibilty = 'visible';
        setTimeout(function () {
            document.querySelector(domStrings.navigationMenu).style.opacity = '1';
        }, 250)
    },
    closeMenu: function () {
        document.querySelector(domStrings.navigationMenuBackground).classList.remove('fullscreen');
        document.querySelector(domStrings.navigationMenu).style.opacity = '0';
        setTimeout(function() {
            document.querySelector(domStrings.navigationMenu).style.visibilty = 'hidden'
            document.querySelector(domStrings.navigationMenu).style.zIndex = '-1';
        }, 200);
    },
    dismissNotification: function () {
        document.querySelector(domStrings.notification).style.opacity = "0";
        document.querySelector(domStrings.notification).style.zIndex = "-100";
    },
    initEventListener: function () {
        console.log('%c Welcome to J²! ', pageValues.logStyles);
        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('work-image')) {
                pageMethods.enlargeImage(e.target);
            } else if (e.target.id == "circleRightLogo" || e.target.id == "circleRightHamburger" || e.target.id == "circleRight") {
                if (!document.querySelector(domStrings.navigationMenuBackground).classList.contains('menu-full')) {
                    pageMethods.openMenu();
                }
            } else if (e.target.classList.contains('close-fullscreen')) {
                pageMethods.closeMenu();
            } else if (e.target.classList.contains('page-link')) {
                pageMethods.closeMenu();
            } else if (e.target.classList.contains('scroll-hint')) {
                fullpage_api.moveTo('about');
            }
        });
        document.querySelector(domStrings.enlargeClose).addEventListener('click', function () {pageMethods.closeEnlarge()});
        document.querySelector(domStrings.notificationClose).addEventListener('click', function () {pageMethods.dismissNotification()});
        document.querySelector(domStrings.talkForm).addEventListener('submit', e => {
            e.preventDefault();
            let formData = new FormData(document.querySelector(domStrings.talkForm));
            fetch(talkForm.getAttribute('action'), {
                method: 'POST',
                headers: {
                'Accept': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: new URLSearchParams(formData).toString()
            })
            .then(res => {
                if (res) {
                    pageMethods.successNotification();
                    document.querySelector(domStrings.talkForm).reset();
                } else {
                    alert('Error submitting form. Please try again.')
                }
            });
        });
    }
};

const myFullpage = new fullpage('#fullpage', {
    licenseKey: '32FDC319-24F94392-ABCB0861-ECB0F5E9',
    anchors: pageValues.pageOrder,
    navigation: true,
    navigationPosition: 'left',
    loopHorizontal: false,
    scrollingSpeed: 700,
    responsiveWidth: 800,
    onLeave: function(origin, destination, direction){
        if (!document.querySelector(domStrings.rightMenu).classList.contains('menu-full')) {
            pageMethods.spinMenu();
        } 
        document.title = `${destination.anchor.charAt(0).toUpperCase() + destination.anchor.slice(1)} - Sarah Tran`
    },
    onSlideLeave: function(section, origin, destination, direction){
        if (!document.querySelector(domStrings.rightMenu).classList.contains('menu-full')) {
            pageMethods.spinMenu();
        } 
    }
});

const typed = new Typed(domStrings.typedElement, {
    stringsElement: domStrings.typedContainer,
    typeSpeed: 60,
    loop: true,
    backDelay: 275,
    backSpeed: 30,
    smartBackspace: true
});

const floatlabels = new FloatLabels( '#talkForm', {
    requiredClass: 'required',
    style: 2
});

pageMethods.initEventListener();

$(document).mousemove(function(e) {
    $("#follow").css({
      left: e.pageX,
      top: e.pageY
    });
  });




  