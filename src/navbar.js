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
	
	navbar_ul.append($('<li><a href="#navbar-top"><i class="fa-solid fa-house"></i></a></li>'));
	
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



