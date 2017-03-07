$(document).ready(() => {

	// Preloader fade in
	$(window).load(function () {
		 $('#preloader').fadeOut('slow', function () {
			 $(this).remove();
		 });
	 });

	// Parallax scrolling
	const isWebKit = 'WebkitAppearance' in document.documentElement.style;

	if(isWebKit && ($(window).width() >= 1020)) {
		((() => {
            const parallax = document.querySelectorAll(".parallax");
            const speed = 0.4;

            window.onscroll = () => {
              [].slice.call(parallax).forEach((el, i) => {
                  const windowYOffset = window.pageYOffset;
                  const elementYOffset = el.offsetTop;
                  const elBackgrounPos = `100% ${(windowYOffset - elementYOffset) * speed}px`;

                  el.style.backgroundPosition = elBackgrounPos;
              });
            };
        }))();
	}

	//MixPanel tracking
	mixpanel.track_links(".link-pdf", "Print/Download Resume", {
		 "referrer": document.referrer
	});
	mixpanel.track_links(".link-linkedin", "Viewed LinkedIn", {
		 "referrer": document.referrer
	});
	mixpanel.track_links(".link-github", "Viewed GitHub", {
		 "referrer": document.referrer
	});


	// Wrap text in h3 with a span element to underline
	$('h3, h4').wrapInner('<span class="underline" />');

	// Wrap images in #section-works to remove spacing at the bottom
	// the wrapper div needs to have line-height: 0
	$('#section-works img').wrap('<div class="img-wrap" />');

});

// Smooth onpage scroll for links
$(() => {
	$('#section-nav a, .button').bind('click', function (event) {
		const $anchor = $(this);

		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1000, 'easeInOutExpo');
		event.preventDefault();
	});
});
