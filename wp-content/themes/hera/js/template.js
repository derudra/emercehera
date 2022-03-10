(function($) { "use strict";

	// Add new div in menu
    $('ul.menu-in-overlay li').addClass('cl-effect-11');

	// Add class for columns : 10, 11, 12 skeleton.  
   $('.rows').find('div').each(function(i, ojb) {
        if ( $(this).hasClass('one columns2') ) {
            $(this).removeClass('one columns2').addClass('twelve columns');
        }

        if ( $(this).hasClass('one columns1') ) {
            $(this).removeClass('one columns1').addClass('eleven columns');
        }

        if ( $(this).hasClass('one columns0') ) {
            $(this).removeClass('one columns0').addClass('ten columns');
        }
    });

   	//Navigation	
	$('ul.slimmenu').on('click',function(){"use strict";	
		var width = $(window).width(); 
		if ((width <= 800)){ 
			$(this).slideToggle(); 
		}	
	});				
	$('ul.slimmenu').slimmenu({
	    resizeWidth: '800',
	    collapserTitle: '',
	    easingEffect:'easeInOutQuint',
	    animSpeed:'medium',
	    indentChildren: true,
	    childrenIndenter: '&raquo;'
	});	

	/* Scroll Too */	
	$(window).load(function(){"use strict";		
		/* Page Scroll to id fn call */
		$("ul.slimmenu li a,a[data-gal='m_PageScroll2id'], a.scroll").mPageScroll2id({
			highlightSelector:"ul.slimmenu li a",
			offset: 75,
			scrollSpeed:1000,
			scrollEasing: "easeInOutCubic"
		});					
	});	

   	//Home fit screen			
	$(function(){"use strict";
		$('#home, #home-sec').css({'height':($(window).height())+'px'});
		$(window).resize(function(){
		$('#home, #home-sec').css({'height':($(window).height())+'px'});
		});
	});	

	//text rotating
	$('.flippy').flippy({
		interval: 4,
		speed: 500,
		stop: false,
		distance: "100px"
	});	

	//Facts Counter 
    $('.counter').counterUp({
        delay: 100,
        time: 3000
    });

	//Scrolling	 
	$("html").niceScroll();

	//Tooltip
	$(".tipped").tipper();
	
	//Logos Carousel 
  	$("#owl-logos").owlCarousel({
	  	itemsCustom : [
			[0, 2],
			[450, 2],
			[600, 2],
			[700, 3],
			[1000, 4],
			[1200, 4],
			[1400, 5],
			[1600, 5]
	  	],
	  	autoPlay : 4000,
	  	pagination : false,
  	});

	/* Portfolio Sorting */
	jQuery(document).ready(function($){
		(function ($) { 
			var container = $('.portfolio-wrap');
			function getNumbColumns() { 
				var winWidth = $(window).width(), 
					columnNumb = 1;
				if (winWidth > 1500) {
					columnNumb = 4;
				} else if (winWidth > 1200) {
					columnNumb = 3;
				} else if (winWidth > 900) {
					columnNumb = 2;
				} else if (winWidth > 600) {
					columnNumb = 2;
				} else if (winWidth > 300) {
					columnNumb = 1;
				}
				return columnNumb;

			}
			function setColumnWidth() { 
				var winWidth = $(window).width(), 
					columnNumb = getNumbColumns(), 
					postWidth = Math.floor(winWidth / columnNumb);
			}
			$('#portfolio-filter #filter a').click(function () { 
				var selector = $(this).attr('data-filter');
				$(this).parent().parent().find('a').removeClass('current');
				$(this).addClass('current');
				container.isotope( { 
					filter : selector 
				});
				setTimeout(function () { 
					reArrangeProjects();
				}, 300);
				return false;
			});
			function reArrangeProjects() { 
				setColumnWidth();
				container.isotope('reLayout');
			}
			container.imagesLoaded(function () { 
				setColumnWidth();
				container.isotope( { 
					itemSelector : '.portfolio-box', 
					layoutMode : 'masonry', 
					resizable : false 
				} );
			} );
			$(window).on('debouncedresize', function () { 
				reArrangeProjects();
			} );
		} )(jQuery);

	});

	/* DebouncedResize Function */
	(function ($) { 
		var $event = $.event, 
			$special, 
			resizeTimeout;
		$special = $event.special.debouncedresize = { 
			setup : function () { 
				$(this).on('resize', $special.handler);
			}, 
			teardown : function () { 
				$(this).off('resize', $special.handler);
			}, 
			handler : function (event, execAsap) { 
				var context = this, 
					args = arguments, 
					dispatch = function () { 
						event.type = 'debouncedresize';
						$event.dispatch.apply(context, args);
					};
				if (resizeTimeout) {
					clearTimeout(resizeTimeout);
				}
				execAsap ? dispatch() : resizeTimeout = setTimeout(dispatch, $special.threshold);
			}, 
			threshold : 150 
		};
	} )(jQuery);


	// Portfolio Ajax
	$(window).load(function() {
	'use strict';		  
		var loader = $('.expander-wrap');
		if(typeof loader.html() == 'undefined'){
			$('<div class="expander-wrap"><div id="expander-wrap" class="container clearfix relative"><p class="cls-btn"><a class="close">X</a></p><div/></div></div>').css({opacity:0}).hide().insertAfter('.portfolio');
			loader = $('.expander-wrap');
		}
		$('.expander').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			var url = $(this).attr('href');
			loader.slideUp(function(){
				$('.page-overlay').show();
				$.get(url, function(data){
					var portfolioContainer = $('.portfolio');
					var topPosition = portfolioContainer.offset().top;
					var bottomPosition = topPosition + portfolioContainer.height();
					$('html,body').delay(600).animate({ scrollTop: bottomPosition - -10}, 800);
					var container = $('#expander-wrap>div', loader);					
					container.html(data);
					$(".video").fitVids();

					$('.project').flexslider({
						animation: "fade",
						selector: ".project-slides .slide",
						controlNav: false,
						directionNav: true ,
						slideshowSpeed: 5000,  
					});	

					loader.slideDown(function(){
						$('.page-overlay').hide();
						if(typeof keepVideoRatio == 'function'){
							keepVideoRatio('.video > iframe');
						}
					}).delay(1000).animate({opacity:1}, 200);
				});
			});
		});
		
		$('.close', loader).on('click', function(){
			loader.delay(300).slideUp(function(){
				var container = $('#expander-wrap>div', loader);
				container.html('');
				$(this).css({opacity:0});
				
			});
			var portfolioContainer = $('.portfolio');
				var topPosition = portfolioContainer.offset().top;
				$('html,body').delay(0).animate({ scrollTop: topPosition - 70}, 500);
		});
	});	

	//Scroll on click
	jQuery(document).ready(function() {	

		jQuery('.back-top').click(function(event) {
			event.preventDefault();
			jQuery('html, body').animate({scrollTop: 0}, 500);
			return false;
		});

	});	    	 		
		
	//Parallax effects 
	$('.parallax-about').parallax("50%", 0.3);
	$('.parallax-blog').parallax("50%", 0.3);
	$('.parallax-home').parallax("50%", 0.4);	

	//Home YouTube Video
	$(".player").mb_YTPlayer();

	$('.image-link, .video-link').magnificPopup({
	    callbacks: {
	      elementParse: function(item) {
	         // the class name
	         if(item.el.context.className == 'video-link') {
	           item.type = 'iframe';
	         } else {
	           item.type = 'image';
	         }
	      }
	    },
	    gallery:{
	    	enabled:true
	    },
	    type: 'image',
	    closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
			verticalFit: true,
			titleSrc: function(item) {
				return item.el.attr('title');
				//return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
			}
		},
	});

})(jQuery);




















		