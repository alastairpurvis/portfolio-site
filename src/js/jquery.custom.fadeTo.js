$(document).ready(function(){

	// Opacity for Print & PDF links
	$('a.link-print, a.link-pdf, a.link-linkedin').fadeTo(0, 0.6);

	// Opacity for Print & PDF links
	$('a.link-print, a.link-pdf, a.link-linkedin').hover(function() {
		$(this).stop().fadeTo('fast', 1);
	}, function () {
		$(this).stop().fadeTo('fast', 0.6);
	});
	
});