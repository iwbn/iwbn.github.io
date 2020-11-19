var navbar_mode = -1;

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
				"padding-top": "40px", 
				"margin-top": "-40px"
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

var prev_navbar_item = null;

$(window).on('scroll', function() {
	var nava = $("#navbar a");
	var current_item = nava.first();

	nava.each(function (i, v) {
		var id = $(v).attr("href");
		var targ = $(id);
		
		var offset = $(window).scrollTop() - targ.offset().top;
		if (offset <= 0){
			return false;
		}
		current_item = $(v);
	});
	nava.css("font-weight", "normal");
	if (prev_navbar_item != current_item){
		prev_navbar_item = current_item;
		current_item.css("font-weight", "bold");
		$('#navbar').animate({
			scrollLeft: $('#navbar').scrollLeft() + current_item.offset().left - $('#navbar').width()/2 + current_item.width()/2
		}, 100);
	}
});

