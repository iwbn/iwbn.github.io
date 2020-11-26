var navbar_margin = 40;
var navbar_mode_threshold = 700;

function define_navbar(){
	var navbar = $("#navbar");
	var all_anchors = $(".navbar-anchor");
	var top_elem = $('<div id="navbar-top"></div>');
	
	$("body").first().prepend(top_elem);
	
	navbar.append($('<a href="#navbar-top">🏠</a>'));
	
	all_anchors.each(function (i, v) {
		if ($(v).parent().css('display') != 'none') {
			var title = v.innerHTML;
			var id = title.replace(" ", "_").toLowerCase();
			$(v).attr("id", id);
			$(v).attr("navbar-initial-margin-top", $(v).css('margin-top'));
			$(v).attr("navbar-initial-padding-top", $(v).css('padding-top'));
			navbar.append($('<a href="#' + id + '">' + title + "</a>"));
		}
	});

	$("body").first().append($('<div id="navbar-padding-bottom"></div>'));
	
	refine_navbar();
}

function refine_navbar(){
	var navbar = $("#navbar");
	var nava = $("#navbar a");
	
	if ($(window).width() <= navbar_mode_threshold) {
		navbar_margin = 70;
		
	}
	else {
		navbar_margin = 40;
	}
	
	var all_anchors = $(".navbar-anchor");
	all_anchors.each(function (i, v) {
		if ($(v).parent().css('display') != 'none') {
			$(v).css({
				"padding-top": parseInt($(v).attr("navbar-initial-padding-top")) + navbar_margin + "px",
				"margin-top": parseInt($(v).attr("navbar-initial-margin-top")) - navbar_margin + "px"
			});
		}
	});

	$("#navbar-padding-bottom").css({
	    'height': $(window).height() + all_anchors.last().offset().top - $("#navbar-padding-bottom").offset().top
	});
}


$( document ).ready(function(){
	define_navbar();
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 300);
	});
	var hash = $(location).attr('hash');
	if (hash.length > 0 && performance.navigation.type != performance.navigation.TYPE_RELOAD){
		console.log(hash);
		document.getElementById(hash.replace("#","")).scrollIntoView();
	}
});

$( window ).resize(function() {
	refine_navbar();
});

var isScrolling;

$(window).on('scroll', function() {
	var nava = $("#navbar a");
	var current_item = $(nava.first());

	nava.each(function (i, v) {
		var id = $(v).attr("href");
		var targ = $(id);
		
		var offset = $(window).scrollTop() - targ.offset().top + navbar_margin;
		if (offset <= 0){
			return false;
		}
		current_item = $(v);
	});
	
	nava.css("font-weight", "normal");
	current_item.css("font-weight", "bold");
	
	//https://gomakethings.com/detecting-when-a-visitor-has-stopped-scrolling-with-vanilla-javascript/
	// Clear our timeout throughout the scroll
	window.clearTimeout( isScrolling );

	// Set a timeout to run after scrolling ends
	isScrolling = setTimeout(function() {
		$('#navbar').stop();
		$('#navbar').animate({
			scrollLeft: $('#navbar').scrollLeft() + current_item.offset().left - $('#navbar').width()/2 + current_item.width()/2
		}, 600);

	}, 100);
	
});

