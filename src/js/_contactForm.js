// checks that an input string looks like a valid email address.

export function contactForm() {
    const isEmail_re       = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    function isEmail (s) {
       return String(s).search (isEmail_re) != -1;
    }

	// Handle Contact Form Submission
	$('form#contactForm button.submit').click(() => {
		const contactName = $('form#contactForm input#contactName').val();
		const contactEmail = $('form#contactForm input#contactEmail').val();
		const contactMessage = $('form#contactForm #contactMessage').val();
		const contactCaptcha = $('form#contactForm input#contactCaptcha').val();
		const contactCaptchaAnswer = $('form#contactForm input#contactCaptchaAnswer').val();

		const dataString = `contactName=${contactName}&contactEmail=${contactEmail}&contactMessage=${contactMessage}`;

		let contactError = '';

		// Check name
		if( contactName == '' ) {
			contactError += 'Please enter your name<br />';
		}

		// Check e-mail
		if ( contactEmail == '') {
			contactError += 'Please enter your e-mail<br />';
		} else if ( isEmail(contactEmail) !== true ) {
			contactError += 'Please enter a valid e-mail address<br />';
		}

		if( contactMessage == '' ) {
			contactError += 'Please enter your message<br />';
		}

		if ( contactCaptcha !== contactCaptchaAnswer ) {
			contactError += 'Please enter the correct validation value <br />';
		}

		if ( contactError == '' ) {
			$.ajax({
				type: "POST",
				url: "https://formspree.io/alastairpurvis@gmail.com",
                dataType: "json",
				data: dataString,
				success() {
					$('#contact-success').fadeIn();
					$('form#contactForm').fadeOut();
					$('#contact-warning').hide();
				}
			});
		} else {
			$('#contact-warning').html(contactError);
			$('#contact-warning').fadeIn();
		}

		return false;

	});
}
