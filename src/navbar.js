var navbar_margin = 40;
var navbar_mode_threshold = 700;
var navbar_defined = false;

function define_navbar(){
	var navbar = $("#content-navbar");
	var navbar_ul = $("<ul></ul>");
	navbar.append(navbar_ul);

	if (navbar.length) {
	    navbar_defined = true;
	}
	else {
	    return;
	}

	var all_anchors = $(".navbar-anchor");
	var top_elem = $('<div id="navbar-top"></div>');
	
	$("body").first().prepend(top_elem);
	
	navbar_ul.append($('<li><a href="#navbar-top">🏠</a></li>'));
	
	all_anchors.each(function (i, v) {
		if ($(v).parent().css('display') != 'none') {
			var title = v.innerHTML;
			var id = title.replace(" ", "_").toLowerCase();

			var orig_id = id;
			var dup = 2;
			while ($("#"+id).length != 0) {
			    id = orig_id + "-" + dup;
			    dup += 1;
			}

			$(v).attr("id", id);
			$(v).prepend($('<button class="navbar-share-anchor" target="' + id + '"><i class="fas fa-link"></i></button>'));
			$(v).attr("navbar-initial-margin-top", $(v).css('margin-top'));
			$(v).attr("navbar-initial-padding-top", $(v).css('padding-top'));
			navbar_ul.append($('<li><a href="#' + id + '">' + title + "</a></li>"));
		}
	});

	$("body").first().append($('<div id="navbar-padding-bottom"></div>'));
	
	refine_navbar();
	scroll_navbar();
}

function refine_navbar(){
    if (!navbar_defined) {
	    return
	}
	var navbar = $("#content-navbar");
	var nava = $("#content-navbar a");

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

function refine_noti(){
    $(".navbar-notification").each(function (i,v){
        var noti = $(v);
        noti.css({
            "top": $(window).height() / 2 - noti.outerHeight(true) / 2,
            "left": $(window).width() / 2 - noti.outerWidth(true) / 2,
        })
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

	$(".navbar-share-anchor").on('click', function (event) {
	    event.preventDefault();

	    var target_url = window.location.origin + window.location.pathname + "#" + $(this).attr("target");
	    var target_tag = document.createElement("textarea");
	    target_tag.style.position = "fixed";
	    target_tag.style.left = "-9999px";
        target_tag.style.top = "0";
	    document.body.appendChild(target_tag);
	    target_tag.textContent = target_url;

	    var currentFocus = document.activeElement;
        target_tag.focus();
        target_tag.setSelectionRange(0, target_tag.value.length);

        /* Copy the text inside the text field */
        document.execCommand("copy");

        document.body.removeChild(target_tag);

        var noti = $('<div class="navbar-notification"></div>');
        noti.html("Copied to clipboard");

        $("body").append(noti);
        refine_noti();
        noti.css("display", "none");
        noti.fadeIn(500).delay(1000).fadeOut(500);
	});
});

$( window ).resize(function() {
	refine_navbar();
	refine_noti();
});

var isScrolling;

function scroll_navbar(){
    if (!navbar_defined) {
	    return
	}

    var head = $("header").first();
    if (head.length && $(window).scrollTop() < head.offset().top){
        $("#content-navbar").css("top", head.offset().top - $(window).scrollTop());
    }
    else {
        $("#content-navbar").css("top", 0);
    }

    var nava = $("#content-navbar ul li a");
	var current_item = $(nava.first());

	nava.each(function (i, v) {
		var id = $(v).attr("href");
		var targ = $(id);

		var offset = $(window).scrollTop() - targ.offset().top + 1;
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
		$('#content-navbar').stop();
		$('#content-navbar').animate({
			scrollLeft: $('#content-navbar').scrollLeft() + current_item.offset().left - $('#content-navbar').width()/2 + current_item.width()/2
		}, 600);

	}, 100);
}

$(window).on('scroll', scroll_navbar);

