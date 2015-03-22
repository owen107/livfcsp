$(function() {

	'use strict';

    var topoffset = 50; // variable for menu height
    var slideqty = $('#featured .item').length;
    var wheight = $(window).height(); //get the height of the window
    var randSlide = Math.floor(Math.random()*slideqty);

    $('#featured .item').eq(randSlide).addClass('active');
 
    $('.fullheight').css('height', wheight); //set to window tallness 

    //replace IMG inside carousels with a background image
    $('#featured .item img').each(function() {
	    var imgSrc = $(this).attr('src');
	    $(this).parent().css({'background-image': 'url('+imgSrc+')'});
	    $(this).remove();
	});

	//adjust height of .fullheight elements on window resize
    $(window).resize(function() {
       wheight = $(window).height(); //get the height of the window
       $('.fullheight').css('height', wheight); //set to window tallness  
    });

    // Activate Scrollspy
    $('body').scrollspy({
    	target: 'header .navbar',
    	offset: topoffset
    }); 

    // add inbody class
    var hash = $(this).find('li.active a').attr('href');
	if (hash !== '#featured') {
		$('header nav').addClass('inbody');
	} else {
		$('header nav').removeClass('inbody');
	}

    // Add an inbody class to nav when scrollspy event fires
    $('.navbar-fixed-top').on('activate.bs.scrollspy', function() {
    	var hash = $(this).find('li.active a').attr('href');
    	if (hash !== '#featured') {
    		$('header nav').addClass('inbody');
    	} else {
    		$('header nav').removeClass('inbody');
    	}
    });

    //Use smooth scrolling when clicking on navigation
	$('.navbar a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') === 
	      this.pathname.replace(/^\//,'') && 
	      location.hostname === this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top-topoffset+2
	        }, 500);
	        return false;
	      } //target.length
	    } //click function
	}); //smooth scrolling

	for (var i = 0; i < slideqty; i++) {
		var insertText = '<li data-target="#featured" data-slide-to="' + i + '"';
	    if (i === randSlide) {
	      insertText += ' class="active" ';
	    }
	    insertText += '></li>';
		$('#featured ol').append(insertText);
	};

    // Animate effect when hovering more info sections
	$('#more .desc').hover(function() {
		
		$(this).animate({
			'bottom': 0 
		}, 'fast', 'linear', function() {

			// initiate the more info action after setting the bottom property
			$(this).find('.action').animate({
				'opacity': 1,
				'marginLeft': '10px'
			}, 'slow', 'swing');
		});	
	}, function() {
		$(this).animate({
			'bottom': '-73%'
		}, 'fast', 'linear', function() {

			 // initiate the more info action after setting the bottom property
			 $(this).find('.action').animate({
				'opacity': 0,
				'marginLeft': '-100px'
			}, 'slow', 'swing');
		});
	});

	$('.carousel').carousel({
	    interval: false
	});

    // Initiate the responsive equal height grid plugin
	$('.player').responsiveEqualHeightGrid();

	//Animation on scroll with wow js 
    new WOW({
    	boxClass:     'wow',
        animateClass: 'animated',
        offset:       100,
        mobile:       true
    }).init();

    // Initiate tooltip plugin
    $("[data-toggle=tooltip]").tooltip();

    // Check to see if the window is top if not then display button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 800) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    // Click event to scroll to top
    $('.scrollToTop').click(function () {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });
    

    $(function(){
		$.stellar({
			horizontalScrolling: false
		});
	});
});