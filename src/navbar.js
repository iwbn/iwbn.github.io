var navbar_mode = -1;

function refine_navbar(){
	var navbar = $("#navbar");
	var nava = $("#navbar a");
	
	var width_th = 1000;
	
	var $containerHeight = $(window).width();
	if (navbar_mode != 1 && $containerHeight <= width_th) {
		navbar_mode = 1;
        nava.animate({
            height:'0'
        }, 500, function() {
			
		});
    }
    if (navbar_mode != 2 && $containerHeight > width_th) {
		navbar_mode = 2;
        nava.animate({
            height:'2em'
        }, 500, function() {
			
	  });
    }
}

$( window ).resize(function() {
	refine_navbar();
});