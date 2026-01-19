(function($) {

	"use strict";



    /*------------------------------------------
        = ALL ESSENTIAL FUNCTIONS
    -------------------------------------------*/

    // Toggle mobile navigation
    function toggleMobileNavigation() {
        var navbar = $(".navigation-holder");
        var openBtn = $(".navbar-header .open-btn");
        var closeBtn = $(".navigation-holder .close-navbar");
        var body = $(".page-wrapper");
        var navLinks = $("#navbar > ul > li > a[href^='#']");

        openBtn.on("click", function() {
            if (!navbar.hasClass("slideInn")) {
                navbar.addClass("slideInn");
                body.addClass("body-overlay");
            }
            return false;
        })

        closeBtn.on("click", function() {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            body.removeClass("body-overlay");
            return false;
        })

        navLinks.on("click", function() {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            body.removeClass("body-overlay");
            return false;
        })
    }

    toggleMobileNavigation();


    // Function for toggle class for small menu
    function toggleClassForSmallNav() {
        var windowWidth = window.innerWidth;
        var mainNav = $("#navbar > ul");

        if (windowWidth <= 991) {
            mainNav.addClass("small-nav");
        } else {
            mainNav.removeClass("small-nav");
        }
    }

    toggleClassForSmallNav();


    // Function for small menu
    function smallNavFunctionality() {
        var windowWidth = window.innerWidth;
        var mainNav = $(".navigation-holder");
        var smallNav = $(".navigation-holder > .small-nav");
        var subMenu = smallNav.find(".sub-menu");
        var megamenu = smallNav.find(".mega-menu");
        var menuItemWidthSubMenu = smallNav.find(".menu-item-has-children > a");

        if (windowWidth <= 991) {
            subMenu.hide();
            megamenu.hide();
            menuItemWidthSubMenu.on("click", function(e) {
                var $this = $(this);
                $this.siblings().slideToggle();
                 e.preventDefault();
                e.stopImmediatePropagation();
            })
        } else if (windowWidth > 991) {
            mainNav.find(".sub-menu").show();
            mainNav.find(".mega-menu").show();
        }
    }

    smallNavFunctionality();


    // function for active menuitem
    function activeMenuItem($links) {
        var top = $(window).scrollTop(),
            windowHeight = $(window).height(),
            documentHeight = $(document).height(),
            cur_pos = top + 2,
            sections = $("section"),
            nav = $links,
            nav_height = nav.outerHeight();


        sections.each(function() {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find("> ul > li > a").parent().removeClass("current-menu-item");
                nav.find("a[href='#" + $(this).attr('id') + "']").parent().addClass("current-menu-item");
            } else if (cur_pos === 2) {
                nav.find("> ul > li > a").parent().removeClass("current-menu-item");
            }

        });
    }


    // smooth-scrolling
    function smoothScrolling($scrollLinks, $topOffset) {
        var links = $scrollLinks;
        var topGap = $topOffset;

        links.on("click", function() {
            if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) +"]");
                if (target.length) {
                    $("html, body").animate({
                    scrollTop: target.offset().top - topGap
                }, 1000, "easeInOutExpo");
                    return false;
                }
            }
            return false;
        });
    }


    // Parallax background
    function bgParallax() {
        if ($(".parallax").length) {
            $(".parallax").each(function() {
                var height = $(this).position().top;
                var resize     = height - $(window).scrollTop();
                var doParallax = -(resize/5);
                var positionValue   = doParallax + "px";
                var img = $(this).data("bg-image");

                $(this).css({
                    backgroundImage: "url(" + img + ")",
                    backgroundPosition: "50%" + positionValue,
                    backgroundSize: "cover"
                });
            });
        }
    }


    // SLIDER
    var menu = [];
    jQuery('.swiper-slide').each( function(index){
        menu.push( jQuery(this).find('.slide-inner').attr("data-text") );
    });
    var interleaveOffset = 0.5;
    var swiperOptions = {
        loop: true,
        speed: 1000,
        parallax: true,
        autoplay: {
            delay: 6500,
            disableOnInteraction: false,
        },
        watchSlidesProgress: true,

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        on: {
            progress: function() {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress;
                    var innerOffset = swiper.width * interleaveOffset;
                    var innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".slide-inner").style.transform =
                    "translate3d(" + innerTranslate + "px, 0, 0)";
                }      
            },

            touchStart: function() {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";
              }
            },

            setTransition: function(speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".slide-inner").style.transition =
                    speed + "ms";
                }
            }
        }
    };

    var swiper = new Swiper(".swiper-container", swiperOptions);

    // DATA BACKGROUND IMAGE
    var sliderBgSetting = $(".slide-bg-image");
    sliderBgSetting.each(function(indx){
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });




    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader() {
        if($('.preloader').length) {
            $('.preloader').delay(100).fadeOut(500, function() {

                //active wow
                wow.init();

            });
        }
    }

    /*------------------------------------------
        = PHOTO STRIP CONTINUOUS SCROLL
    -------------------------------------------*/
    function initPhotoStrip() {
        // Handle each photo strip independently
        $('.photo-strip-container').each(function(index) {
            var container = $(this);
            var photoStrip = container.find('.photo-strip');
            
            if (photoStrip.length) {
                // Clone images multiple times for seamless infinite loop
                var images = photoStrip.html();
                photoStrip.append(images);
                photoStrip.append(images);
                photoStrip.append(images);
                
                // Create seamless loop by resetting position for each strip
                var originalWidth = photoStrip[0].scrollWidth / 4;
                
                setInterval(function() {
                    if (container[0].scrollLeft >= originalWidth) {
                        container.scrollLeft(0);
                    }
                }, 50);
            }
        });
    }


    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    var wow = new WOW({
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
    });

    // Initialize WOW on page load
    wow.init();

    /*------------------------------------------
        = SCROLL FADE EFFECT
    -------------------------------------------*/
    // Add fade-in effect to sections on scroll
    $(document).ready(function() {
        // Add fade-in class to all major sections
        $('section, .fade-scroll, [data-fade-scroll]').each(function() {
            $(this).addClass('fade-scroll-element');
            $(this).css('opacity', '0');
        });

        // Force hero texts to appear and animate on load
        var $heroTexts = $('.hero-slider .couple-name, .hero-slider #curve-text');
        $heroTexts.css({visibility:'visible', opacity:1});
        $heroTexts.addClass('animated slideInUp');

        // Handle scroll event for fade-in
        function handleScrollFade() {
            $('.fade-scroll-element').each(function() {
                var elementTop = $(this).offset().top;
                var elementBottom = elementTop + $(this).height();
                var viewportTop = $(window).scrollTop();
                var viewportBottom = viewportTop + $(window).height();

                // If element is in viewport
                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    if (!$(this).hasClass('faded-in')) {
                        $(this).addClass('faded-in');
                        $(this).css({
                            'opacity': '1',
                            'animation': 'fadeInScroll 0.8s ease-in-out forwards'
                        });
                    }
                }
            });
        }

        // Run on load
        handleScrollFade();

        // Run on scroll
        $(window).on('scroll', function() {
            handleScrollFade();
        });
    });


    /*------------------------------------------
        = ACTIVE POPUP IMAGE
    -------------------------------------------*/
    if ($(".fancybox").length) {
        var swipeHintTimeout;
        var swipeHintShown = false;
        try {
            swipeHintShown = localStorage.getItem('swipeHintShown') === '1';
        } catch (e) {}

        $(".fancybox").fancybox({
            openEffect  : "elastic",
            closeEffect : "elastic",
            wrapCSS     : "project-fancybox-title-style",
            // Enable touch/swipe gestures for mobile
            helpers: {
                overlay: {
                    locked: false
                }
            },
            // Enable swipe navigation
            arrows: true,
            nextClick: true,
            // Touch settings
            touch: {
                vertical: true,
                momentum: true
            },
            // Mouse wheel support
            mouseWheel: false,
            // Loop through gallery
            loop: true,
            // Show swipe hint once per open
            afterShow: function() {
                if (swipeHintShown) return;
                var $wrap = this.wrap;
                if (!$wrap || !$wrap.length) return;

                var $hint = $('<div class="fancybox-swipe-hint" aria-hidden="true"><iframe src="https://lottie.host/embed/0e953039-d850-4e4f-bbf6-5b975685ab0c/IXySmiyFAb.lottie" title="Swipe hint"></iframe></div>');
                $wrap.append($hint);

                setTimeout(function() {
                    $hint.addClass('show');
                }, 200);

                swipeHintTimeout = setTimeout(function() {
                    $hint.remove();
                }, 3200);

                swipeHintShown = true;
                try {
                    localStorage.setItem('swipeHintShown', '1');
                } catch (e) {}
            },
            afterClose: function() {
                if (swipeHintTimeout) {
                    clearTimeout(swipeHintTimeout);
                    swipeHintTimeout = null;
                }
                $(".fancybox-swipe-hint").remove();
            }
        });
    }


    /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/
    if ($(".video-play-btn").length) {
        $(".video-play-btn").on("click", function(){
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title'         : this.title,
                helpers     : {
                    title : { type : 'inside' },
                    media : {}
                },

                beforeShow : function(){
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });
    }


    /*------------------------------------------
        = POPUP YOUTUBE, VIMEO, GMAPS
    -------------------------------------------*/
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });


    /*------------------------------------------
        = ACTIVE GALLERY POPUP IMAGE
    -------------------------------------------*/
    if ($(".popup-gallery").length) {
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',

            gallery: {
              enabled: true
            },

            zoom: {
                enabled: true,

                duration: 300,
                easing: 'ease-in-out',
                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
    }


    /*------------------------------------------
        = FUNCTION FORM SORTING GALLERY
    -------------------------------------------*/
    function sortingGallery() {
        if ($(".sortable-gallery .gallery-filters").length) {
            var $container = $('.gallery-container');
            $container.isotope({
                filter:'*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });

            $(".gallery-filters li a").on("click", function() {
                $('.gallery-filters li .current').removeClass('current');
                $(this).addClass('current');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter:selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });
        }
    }

    sortingGallery();


    /*------------------------------------------
        = MASONRY GALLERY SETTING
    -------------------------------------------*/
    function masonryGridSetting() {
        if ($('.masonry-gallery').length) {
            var $grid =  $('.masonry-gallery').masonry({
                itemSelector: '.grid-item',
                columnWidth: '.grid-item',
                percentPosition: true
            });

            $grid.imagesLoaded().progress( function() {
                $grid.masonry('layout');
            });
        }
    }

    // masonryGridSetting();

    /*------------------------------------------
        = COUPLE CARD FLIP (multi-image support)
    -------------------------------------------*/
    function initCoupleFlip() {
        var $container = $('.middle-couple-pic');
        if (!$container.length) return;
        var $imgs = $container.find('.couple-img');
        if (!$imgs.length) return;

        var current = 0;
        // initialize classes
        $imgs.removeClass('active prev');
        $imgs.eq(current).addClass('active');
        if ($imgs.length > 1) $imgs.eq(($imgs.length + current - 1) % $imgs.length).addClass('prev');

        var interval = 4200; // ms
        var timer;
        function showIndex(next) {
            next = (next + $imgs.length) % $imgs.length;
            if (next === current) return;
            var prevIndex = current;
            current = next;
            $imgs.removeClass('active prev');
            $imgs.eq(current).addClass('active');
            $imgs.eq(prevIndex).addClass('prev');
        }
        function start() {
            timer = setInterval(function() {
                showIndex(current + 1);
            }, interval);
        }
        function stop() {
            if (timer) clearInterval(timer);
            timer = null;
        }
        // Pause on hover (mobile will ignore)
        $container.on('mouseenter', stop).on('mouseleave', function(){ stop(); start(); });

        // Touch / swipe support (mobile)
        var touchStartX = null, touchStartY = null, touchEndX = null, touchEndY = null;
        var swipeThreshold = 40; // px
        $container.on('touchstart', function(e) {
            stop();
            var t = e.originalEvent.touches ? e.originalEvent.touches[0] : e.originalEvent;
            touchStartX = t.clientX;
            touchStartY = t.clientY;
            touchEndX = touchStartX;
            touchEndY = touchStartY;
        });
        $container.on('touchmove', function(e) {
            var t = e.originalEvent.touches ? e.originalEvent.touches[0] : e.originalEvent;
            touchEndX = t.clientX;
            touchEndY = t.clientY;
        });
        $container.on('touchend', function(e) {
            var dx = (touchEndX || touchStartX) - touchStartX;
            var dy = (touchEndY || touchStartY) - touchStartY;
            // horizontal swipe? and beyond threshold
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > swipeThreshold) {
                if (dx < 0) {
                    // left swipe -> next
                    showIndex(current + 1);
                } else {
                    // right swipe -> prev
                    showIndex(current - 1);
                }
            }
            touchStartX = touchStartY = touchEndX = touchEndY = null;
            // resume auto-rotation after brief delay
            setTimeout(function(){ start(); }, 800);
        });

        // Click demo: briefly enable 3D flip to preview the rotate effect
        var demoTimer;
        $container.on('click', function() {
            // If in 3D mode, advance to next immediately
            if ($container.hasClass('three-d')) {
                showIndex(current + 1);
                return;
            }
            // demo: enable 3D mode, show next, then revert
            $container.addClass('three-d');
            showIndex(current + 1);
            clearTimeout(demoTimer);
            demoTimer = setTimeout(function() {
                // keep the new image visible but disable 3D styling
                $container.removeClass('three-d');
            }, 2200);
        });

        // start after small delay
        setTimeout(start, 600);
    }



    /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/

    // Function for clone an element for sticky menu
    function cloneNavForSticyMenu($ele, $newElmClass) {
        $ele.addClass('original').clone().insertAfter($ele).addClass($newElmClass).removeClass('original');
    }

    // clone home style 1 navigation for sticky menu
    if ($('.site-header .navigation').length) {
        cloneNavForSticyMenu($('.site-header .navigation'), "sticky");
    }

    //clone home style 1 navigation for sticky menu
    if ($('.header-style-2 .navigation').length) {
        cloneNavForSticyMenu($('.header-style-2 .navigation'), "sticky-2");
    }

    // Function for sticky menu
    function stickIt($stickyClass, $toggleClass, $topOffset) {
        if ($(window).scrollTop() >= $topOffset) {
            var orgElement = $(".original");
            var widthOrgElement = orgElement.css("width");

            $stickyClass.addClass($toggleClass);

            $stickyClass.css({
                "width": widthOrgElement
            }).show();

            $(".original").css({
                "visibility": "hidden"
            });

        } else {

            $(".original").css({
                "visibility": "visible"
            });

            $stickyClass.removeClass($toggleClass);
        }
    }


    /*------------------------------------------
        = HERO CURVE TEXT
    -------------------------------------------*/
    if($("#curve-text").length) {
        var $curveText   = $('#curve-text').hide();
        $curveText.show().arctext({radius: 150, dir:1, animation: '300ms'});
    }


    /*------------------------------------------
        = COUNTDOWN CLOCK
    -------------------------------------------*/
    if ($("#clock").length) {
        var $clock = $('#clock');
        // Read target date from data attribute `data-countdown` (format: YYYY/MM/DD or YYYY/MM/DD HH:MM:SS)
        // Fallback to an updated default date if attribute is not present
        var targetDate = $clock.data('countdown') || '2026/02/19 14:00:00';

        // Initialize countdown (requires the countdown plugin included in jquery-plugin-collection.js)
        $clock.countdown(targetDate, function(event) {
            var $this = $(this).html(event.strftime(''
            + '<div class="box"><div><div class="time">%D</div> <span>Days</span> </div></div>'
            + '<div class="box"><div><div class="time">%H</div> <span>Hours</span> </div></div>'
            + '<div class="box"><div><div class="time">%M</div> <span>Mins</span> </div></div>'
            + '<div class="box"><div><div class="time">%S</div> <span>Secs</span> </div></div>'));
        });
    }


    /*------------------------------------------
        = POST SLIDER
    -------------------------------------------*/
    if($(".post-slider".length)) {
        $(".post-slider").owlCarousel({
            mouseDrag: false,
            smartSpeed: 500,
            margin: 30,
            loop:true,
            nav: true,
            navText: ['<i class="fi flaticon-back"></i>','<i class="fi flaticon-next"></i>'],
            dots: false,
            items: 1
        });
    }  


    /*------------------------------------------
        = VIDEO BACKGROUND
    -------------------------------------------*/
    if ($("#video-background").length) {
        $('#video-background').YTPlayer({
            showControls: false,
            playerVars: {
                modestbranding: 0,
                autoplay: 1,
                controls: 1,
                showinfo: 0,
                wmode: 'transparent',
                branding: 0,
                rel: 0,
                autohide: 0,
                origin: window.location.origin
            }
        });
    }


    /*------------------------------------------
        = WATER RIPPLE
    -------------------------------------------*/
    if ($(".ripple").length) {
        $('.ripple').ripples({
            resolution: 512,
            dropRadius: 20, //px
            perturbance: 0.04,
        });

        // Automatic drops
        setInterval(function() {
            var $el = $('.ripple');
            var x = Math.random() * $el.outerWidth();
            var y = Math.random() * $el.outerHeight();
            var dropRadius = 20;
            var strength = 0.04 + Math.random() * 0.04;

            $el.ripples('drop', x, y, dropRadius, strength);
        }, 400);
    }
    


    /*------------------------------------------
        = GOOGLE MAP
    -------------------------------------------*/
    function map() {

        var locations = [
            ['Hotel royal international khulna ', 22.8103888, 89.5619609,1],
            ['City inn khulna', 22.820884, 89.551216,2],
        ];

        var map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng( 22.8103888, 89.5619609),
            zoom: 12,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP

        });

        var infowindow = new google.maps.InfoWindow();

        var marker, i;

        for (i = 0; i < locations.length; i++) {
                marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map,
                icon:'images/map-marker.png'
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    };


    /*------------------------------------------
        = RSVP FORM SUBMISSION
    -------------------------------------------*/
    if ($("#rsvp-form").length) {
        $("#rsvp-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: "required",

                guest: {
                    required: true
                },

                events: {
                    required: true
                }

            },

            messages: {
                name: "Please enter your name",
                email: "Please enter your email",
                guest: "Select your number of guest",
                events: "Select your event list"
            },

            submitHandler: function (form) {
                $("#loader").css("display", "inline-block");
                $.ajax({
                    type: "POST",
                    url: "mail.php",
                    data: $(form).serialize(),
                    success: function () {
                        $( "#loader").hide();
                        $( "#success").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#success").slideUp( "slow" );
                        }, 3000);
                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#error").slideUp( "slow" );
                        }, 3000);
                    }
                });
                return false; // required to block normal submit since you used ajax
            }

        });
    }


    /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
        $(window).on('load', function() {

            preloader();

            toggleMobileNavigation();

            smallNavFunctionality();

            smoothScrolling($("#navbar > ul > li > a[href^='#']"), $(".site-header .navigation").innerHeight());

            // start couple flip
            initCoupleFlip();

            // Initialize photo strip continuous scroll
            initPhotoStrip();

        });



    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll", function() {

        if ($(".header-style-1").length) {
            stickIt($(".sticky"), "sticky-on", $(".header-style-1 .navigation").offset().top);
        }

        if ($(".header-style-2").length) {
            stickIt($(".sticky-2"), "sticky-on", 500);
        }

        activeMenuItem($(".navigation-holder"));

    });


    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).on("resize", function() {
        
        toggleClassForSmallNav();

        clearTimeout($.data(this, 'resizeTimer'));
        $.data(this, 'resizeTimer', setTimeout(function() {
            smallNavFunctionality();
        }, 200));

    });

    /*==========================================================================
        YOUTUBE VIDEO AUTOPLAY ON SCROLL
    ==========================================================================*/
    function initVideoAutoplay() {
        var videoWrapper = document.querySelector('.video-wrapper');
        var videoIframe = document.getElementById('weddingVideo');
        
        if (!videoWrapper || !videoIframe) return;

        var hasAutoPlayed = false;
        var baseUrl = videoIframe.src.split('&autoplay=')[0].split('&mute=')[0];
        
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                // When video comes into view
                if (entry.isIntersecting && !hasAutoPlayed) {
                    // Update iframe src to include autoplay parameter
                    videoIframe.src = baseUrl + '&mute=1&autoplay=1';
                    hasAutoPlayed = true;
                }
            });
        }, {
            threshold: 0.3 // Trigger when 30% of the video is visible
        });

        observer.observe(videoWrapper);
    }

    // Initialize video autoplay when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initVideoAutoplay);
    } else {
        initVideoAutoplay();
    }


    /*==========================================================================
        HERO LOTTIE OVERLAY (DELAYED APPEAR)
    ==========================================================================*/
    function initHeroLottie() {
        var lottie = document.querySelector('.hero-lottie');
        if (!lottie) return;

        setTimeout(function() {
            lottie.classList.add('show');
        }, 1500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroLottie);
    } else {
        initHeroLottie();
    }


})(window.jQuery);


