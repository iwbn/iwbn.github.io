$( document ).ready(function(){
    const toggleSwitch = $("#radiobutton-theme");


    toggleSwitch.append(defaultThemeControl);
    detectColorScheme();

    toggleSwitch.click(switchTheme);
    var a_items = $('a:not(.a-no-blank)');
    a_items.attr("target", "_blank");
	
	refine_pub();
});

$( document ).ready(function(){
	define_navbar();
	refine_navbar();
	scroll_navbar();
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
        noti.fadeIn(500).delay(1000).fadeOut(500, function(){$(this).remove();});
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
        $("#content-navbar").css("top", head.offset().top);
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

var oldPrintFunction = window.print;

window.print = function () {
	$("#iframe_print").remove();
    prepare_print();
};
