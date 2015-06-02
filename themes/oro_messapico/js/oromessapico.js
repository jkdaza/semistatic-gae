/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 * Modified by Dario Faniglione for Oro Messapico 2015
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        var pos = $($anchor.attr('href')).offset().top;
        //Account for future top fixed items
        if ($('.section-head-lower.fixed-top').length == 0) {
        	pos = pos-$('.section-head-lower').height()
        }
        if ($anchor.hasClass('subsection-link')) {
        	pos = pos-130;
        }
        $('html, body').stop().animate({
            scrollTop: pos
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
        
    });
    var hash = window.location.hash;
    if (hash) {
    	$('a.page-scroll[href="'+hash+'"]')
    	.delay(500)//Wait for images to load
    	.trigger('click');
    	if (history && 'replaceState' in history) {
    		history.replaceState({}, document.title, window.location.pathname);
    	}
    }
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: 'nav.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

/*!
 * ORO MESSAPICO JS
 * Author: Dario Faniglione
 * All Rights Reserved
 */

$('document').ready(function(){
	//Read More
	$('a.read-more').on('click',function(e) {
		e.preventDefault();
		var $this = $(this)
		var text = $this.closest('.subsection');
		var in_section = true;
		if (text.length == 0) {
			text = $this.closest('.parag-text');
			in_section = false;
		}
		var hidden = text.find('.hidden-parag');
		hidden.slideDown(800);
		$this.hide();
		if (in_section) {
			$('html, body').stop().animate({
	            scrollTop: text.offset().top-130
	        }, 500, 'easeInOutExpo');
	        event.preventDefault();
		} else {
			$('html, body').stop().animate({
	            scrollTop: (hidden.offset().top-130)
	        }, 1000, 'easeInOutExpo');
		}
	});
	//Read less
	$('a.read-less').on('click',function(e) {
		e.preventDefault();
		var hidden = $(this).closest('.hidden-parag');
		var text = hidden.closest('.subsection');
		if (text.length == 0) {
			text = hidden.closest('.parag-text');
		}
		var read_more = text.find('a.read-more');
		hidden.slideUp(400, function() {
			read_more.show();
		});
		$('html, body').stop().animate({
            scrollTop: (hidden.closest('section').offset().top)
        }, 1000, 'easeInOutExpo');
	});
	var item = $('.section-head-lower');
	if ($('body').data('pageid') != 'home') {
		item.addClass('fixed-top');
		$('nav.navbar').addClass('navbar-shrink');
	} else {
		var win = $(window)
		var pos = item.offset().top;
		win.scroll(function () {
			var st = win.scrollTop();
		    if (st < pos-40) {
		    	item.removeClass('fixed-top');
		    } else {
		    	item.addClass('fixed-top');
		    }
		});
	}
	//Position drawings
	var drawingPosition = function(text,drawing,delay) {
		var mt = text.height()-(text.height()/2);
		drawing.css({'margin-top':mt});
		/*animate({
			marginTop: mt
        }, 500, 'easeInElastic');*/
		
		
	}
	$('img','.drawing-column').each(function() {
		var drawing = $(this);
		var row = drawing.closest('.row');
		var text = $('.parag-text',row);
		drawingPosition(text,drawing);
		new ResizeSensor(text, function() {
			drawingPosition(text,drawing);
		});
	});
	
	
	//Contact Form Ajax
	var contacForm = $('form#contact-form');
	var contacFormSubmit = $('#contact-form-submit');
	contacForm.submit(function(e) {
		e.preventDefault();
		var form = $(this);
		var data = {};
		var validated = 0;
		
		var fields = $('.form-control',form);
		fields.each(function() {
			var field = $(this);
			var val = field.val();
			if (!field.hasClass('required') || val.length > 0) {
				validated += 1;
			}
			data[field.attr('name')] = field.val();
		});
		if (validated != fields.length) {
			//Error Message
			alert('Please enter required fields!')
			return false;
		}
		$.ajax({
			url : '/send-message',
			data: data,
			type: 'POST',
			dataType: 'json',
			success: function(d) {
				if (d['error']) {
					alert(d['error']);
				} else if (d['message']) {
					contacForm.before('<div class="alert alert-success" role="alert">'+d['message']+'</div>');
					contacForm.hide();
					contacFormSubmit.hide();
				}
			}
		});
	});
	contacFormSubmit.on('click',function() {
		contacForm.trigger('submit');
	});
	
	
});