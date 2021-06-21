var defaultThemeControl = $(''+
    '<input type="radio" id="prefer-color-dark" name="prefer-color-scheme" value="dark">'+
    '<label for="prefer-color-dark"><i class="fas fa-moon"></i></label>'+
    '<input type="radio" id="prefer-color-light" name="prefer-color-scheme" value="light">'+
    '<label for="prefer-color-light"><i class="fas fa-moon"></i></label>');

//https://stackoverflow.com/questions/56300132/how-to-override-css-prefers-color-scheme-setting
//determines if the user has a set theme
function detectColorScheme(){
    var checkedRadios = $("#radiobutton-theme input[type='radio']:checked");
    var checkedRadio = null;
    if (checkedRadios.length){
        checkedRadio = checkedRadios.first();
    }
    else {
        if(!window.matchMedia) {
            checkedRadio = $("#prefer-color-light").first();
        } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
            checkedRadio = $("#prefer-color-dark").first();
        }
        else {
            checkedRadio = $("#prefer-color-light").first();
        }

        checkedRadio.prop("checked", true);
    }

    var checked_id = checkedRadio.attr('id');

    if (checked_id == "prefer-color-auto") {
        //localStorage.setItem('theme', 'auto');
    }
    else if (checked_id == "prefer-color-dark") {
        //localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute("data-theme", "dark");
    }
    else if (checked_id == "prefer-color-light") {
        //localStorage.setItem('theme', 'light');
        document.documentElement.setAttribute("data-theme", "light");
    }

    refineThemeButton();

}

function refineThemeButton(){
    var radios = $("#radiobutton-theme input[type='radio']");
    var checkedRadio = $("#radiobutton-theme input[type='radio']:checked").first();

    $("#radiobutton-theme label").css("display", "none");
    var label = $("label[for='"+checkedRadio.attr('id')+"']");
    label.css("display", "inline-block");
}


//function that changes the theme, and sets a localStorage variable to track the theme between page loads
function switchTheme(e) {
    e.stopPropagation();
    var $radios = $("#radiobutton-theme input[type='radio']");
    var $checked = $radios.filter(':checked');
    var $next = $radios.eq($radios.index($checked) + 1);
    if(!$next.length){
        $next = $radios.first();
    }
    $next.prop("checked", true);

    detectColorScheme();
}





