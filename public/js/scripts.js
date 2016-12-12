/*global jQuery */

// Once window is loaded, do this
void function initScripts($){
	'use strict'

	$(() => {
		// hide flash message after 1.5s
		setTimeout(() => {
			$('.flash-message-container').slideUp(1000);
		}, 1500);

		// have cursor focus on input after modal opens
		$('button[data-target="#LoginModal"]').click(function onClick(){
			const id = $(this).attr('data-target');
			setTimeout(() => {
				$(`${id} input`).first().focus();
			}, 200);
		});
		
		// initialize summernote where it is being used
		$('.summernote').summernote({height: 150});
	});	
	/* eslint-enable */
}(jQuery.noConflict());