import { smoothScroll } from './_scrolling.js';
import { parallax } from './_parallax.js';
import { tracking } from './_tracking.js';
import { contactForm } from './_contactForm.js';
import { lightbox } from './vendor/_lightbox.js';

$(document).ready(() => {

	smoothScroll("#section-nav a, .button");
	lightbox($);
	parallax(0.4);
	contactForm();

});

$(window).on("load", () => {

	 $('#preloader').fadeOut('slow', function () {
		 $(this).remove();
	 });

	tracking();

 });
