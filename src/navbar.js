var navbar_margin = 70;

function define_navbar(){
	var navbar = $("#navbar");
	var all_h3 = $("h3");
	navbar.append($('<a href="#top">🏠</a>'));
	
	all_h3.each(function (i, v) {
		if ($(v).parent().css('display') != 'none') {
			var title = v.innerHTML;
			var id = title.replace(" ", "_").toLowerCase();
			$(v).attr("id", id);
			$(v).css({
				"padding-top": navbar_margin + "px", 
				"margin-top": -navbar_margin + "px"
			});
			navbar.append($('<a href="#' + id + '">' + title + "</a>"));
		}
	});
}

function refine_navbar(){
	var navbar = $("#navbar");
	var nava = $("#navbar a");
}


$( document ).ready(function(){
	define_navbar();
	$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});
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
		$('#navbar').animate({
			scrollLeft: $('#navbar').scrollLeft() + current_item.offset().left - $('#navbar').width()/2 + current_item.width()/2
		}, 500);
	}
});

