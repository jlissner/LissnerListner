const formidable = require('formidable');

function formidableMiddleware() {
	return (req, res, next) => {
		req.fields = req.fields || [];
		req.files = req.files || [];

		const form = new formidable.IncomingForm();

		// specify that we want to allow the user to upload multiple files in a single request
		form.multiples = true;

		form.on('file', (field, file) => {
			req.fields.push(field);
			req.files.push(file);
		});

		// log any errors that occur
		form.on('error', (err) => {
			console.log('An error has occured: \n' + err);
			next();
		});

		// once all the files have been uploaded, send a response to the client
		form.on('end', () => {
			next();
		});

		form.parse(req);
	}
}

module.exports = formidableMiddleware;