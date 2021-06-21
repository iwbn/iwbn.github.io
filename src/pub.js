function refine_pub(){
	var pub_items = document.getElementsByClassName("pub-item");
	var author_info_list = document.getElementsByClassName("pub-author-info-list")[0].children[1].children;
	
	var author_infos = [];
	for (i = 0; i < author_info_list.length; i++) {
		var item = author_info_list[i];
		author_infos[item.innerHTML] = item.getAttribute("url");
	}
	
    var authors_arr = document.getElementsByClassName("pub-authors");
    for (i = 0; i < authors_arr.length; i++) {
        var authors = authors_arr[i].children;
        for (j=0; j < authors.length; j++) {
            if (authors[j].innerHTML == 'Woobin Im'){
                authors[j].setAttribute('style', 'font-weight:bold')
            }
			else if (typeof author_infos[authors[j].innerHTML] !== 'undefined'){
				authors[j].outerHTML  = '<a href="' + author_infos[authors[j].innerHTML] +'">' + authors[j].outerHTML  + '</a>';
				
			}
            if (authors.length > 2 && j < authors.length - 1)
                $(authors[j]).after(',');
            else if (authors.length != 1 && j == authors.length - 1)
                $(authors[j]).before(' and ');
        }
    }

    
    var prev_item_year = -1;
    for (i = 0; i < pub_items.length; i++) {
        var pub_item = pub_items[i];
        var this_year = parseInt(pub_item.getAttribute("year"));
		
		var pub_journal = $(pub_item).children(".pub-journal")[0];
		if (pub_journal){
			var journal_name = $.trim(pub_journal.innerHTML);
			pub_journal.innerHTML = journal_name;
			var year_span = $("<span>");
			year_span.addClass("only-on-print");
			year_span.css("display", "inline");
			year_span.html(", " + this_year.toString());
			$(pub_journal).after(year_span);
		}
		
        if (this_year != prev_item_year){
			$(pub_item).wrap('<div class="print-dont-break"></div>');
			var year_item = $('<span class="pub-year">'+this_year.toString()+'</span>');
			year_item.addClass("not-on-print");
            $(pub_item).before(year_item);
            var prev_item_year = parseInt(pub_item.getAttribute("year"));
        }
    }
}