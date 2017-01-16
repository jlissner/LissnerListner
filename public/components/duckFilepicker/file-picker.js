/* global jQuery */

void function initFilepicker($){
	'use strict'

	function uploadFiles(formData, $wrapper) {
		$wrapper.trigger('fileUploading');

		const $failed = $('<p/>', {
			'class': 'alert alert-danger p-A',
			text: 'Sorry, something went wrong while uploading your file'
		})

		console.log(3)

		$.ajax({
			url: '/upload',
			type: 'POST',
			data: formData,
			processData: false,
			contentType: false,
			success: () => {
				console.log(4)
				$wrapper.trigger('filesUploaded')
			},
			error: (err) => {
				console.log(5)
				$wrapper.trigger('filesUploaded', [false])
				$wrapper.find('input[type="file"]').val('')
					.after($failed)

				setTimeout(() => {$failed.slideUp(500)}, 3000);
				setTimeout(() => {$failed.detach()}, 3500);
				console.log(err);
			}
		});
	}

	/* function getFiles($wrapper) {
		$.ajax({
			url: '/getFiles',
			type: 'GET',
			contentType: 'application/json',
			success: (data) => {
				$wrapper.trigger('gotFiles', [data])
			}});
	}

	$('.pick-image').on('click', () => {
		$.ajax({
			url: '/getFiles',
			type: 'GET',
			contentType: 'application/json',
			success: (data) => {
				const $imageList = $('#ImageList');
				const length = data.length;

				if(!length) {
					return;
				}

				for (var i = 0; i < length; i++) {
					$imageList.append($('<img>', {
						"class": 'w-30 f-L',
						src: `https://s3-us-west-2.amazonaws.com/lissnerlistner.com/${data[i].Key}`,
						alt: data[i].Key
					}))
				}

				$imageList.find('.fa').addClass('hidden');
			}});
	}); */

	function uploadImage(e) {
		const $wrapper = e.data.wrapper;
		const files = $wrapper.find('input').get(0).files;

		if (files.length > 0){
			// create a FormData object which will be sent as the data payload in the
			// AJAX request
			const formData = new FormData();

			// loop through all the selected files and add them to the formData object
			for (let i = 0; i < files.length; i++) {
				const file = files[i];

				// add the files to formData object for the data payload
				formData.append('files', file, file.name);
				console.log(1);
			}

			console.log(2)
			uploadFiles(formData, e.data.wrapper);
		}
	}

	function filePicker(wrapper) {
		const $wrapper = $(wrapper);
		const $uploading = $('<i/>', {
			'class': 'fa fa-spinner fa-spin d-Ib mr-Xs hidden',
			'aria-hidden': 'true'
		});

		$wrapper.prepend($uploading)

		$wrapper.on('fileUploading', () => {
			$uploading.removeClass('hidden');
		});

		$wrapper.on('filesUploaded', () => {
			$uploading.addClass('hidden');
		})

		$wrapper.find('.btn').on('click', {wrapper: $wrapper}, uploadImage)
		//$wrapper.find('input[type="file"]').on('change', {wrapper: $wrapper}, uploadImage);
	}

	$.fn.filePicker = function init() {
		return this.each((index, wrapper) => {
			filePicker(wrapper);
		});
	}

	$(() => {$('[duck-type="image"]').filePicker();});
}(jQuery.noConflict());