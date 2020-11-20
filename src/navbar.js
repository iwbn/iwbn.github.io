var navbar_margin = 40;
var navbar_mode_threshold = 700;

function define_navbar(){
	var navbar = $("#navbar");
	var all_h3 = $("h3");
	navbar.append($('<a href="#top">🏠</a>'));
	
	all_h3.each(function (i, v) {
		if ($(v).parent().css('display') != 'none') {
			var title = v.innerHTML;
			var id = title.replace(" ", "_").toLowerCase();
			$(v).attr("id", id);
			navbar.append($('<a href="#' + id + '">' + title + "</a>"));
		}
	});
	
	refine_navbar();
}

function refine_navbar(){
	var navbar = $("#navbar");
	var nava = $("#navbar a");
	
	if ($(window).width() <= 700) {
		navbar_margin = 70;
		
	}
	else {
		navbar_margin = 40;
	}
	
	var all_h3 = $("h3");
	all_h3.each(function (i, v) {
		if ($(v).parent().css('display') != 'none') {
			$(v).css({
				"padding-top": navbar_margin + "px", 
				"margin-top": - navbar_margin + "px"
			});
		}
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

var prev_navbar_item = $("#top");

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
	
	if (prev_navbar_item[0] != current_item[0]){
		prev_navbar_item = current_item;
		$('#navbar').stop();
		$('#navbar').delay( 500 ).animate({
			scrollLeft: $('#navbar').scrollLeft() + current_item.offset().left - $('#navbar').width()/2 + current_item.width()/2
		}, 500);
	}
});

