function prepare_print() {
	var iframe = $('<iframe src="/viewer.html?url=/" id="iframe_print"></iframe>');
	iframe.css({
		height: 0,
		border: "none"
	});
	$('body').append(iframe);
}