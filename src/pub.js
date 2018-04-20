function refine_pub(){
    var authors_arr = document.getElementsByClassName("pub-authors");
    for (i = 0; i < authors_arr.length; i++) {
        var authors = authors_arr[i].children;
        for (j=0; j < authors.length; j++) {
            if (authors[j].innerHTML == 'Woobin Im'){
                authors[j].setAttribute('style', 'font-weight:bold')
            }
            if (authors.length > 2 && j < authors.length - 1)
                $(authors[j]).after(',');
            else if (authors.length != 1 && j == authors.length - 1)
                $(authors[j]).before(' and ');
        }
    }

    var pub_items = document.getElementsByClassName("pub-item");
    var prev_item_year = -1;
    for (i = 0; i < pub_items.length; i++) {
        pub_item = pub_items[i];
        this_year = parseInt(pub_item.getAttribute("year"));
        if (this_year != prev_item_year){
            $(pub_item).before('<span class="pub-year">'+this_year.toString()+'</span>');
            prev_item_year = parseInt(pub_item.getAttribute("year"));
        }
    }
}
$( document ).ready(function(){refine_pub();});