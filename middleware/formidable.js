const formidable = require('formidable');

function formidableMiddleware() {
	return (req, res, next) => {
		console.log('~~~~~~~~~~~~~')
		console.log(req.originalUrl);
		console.log('~~~~~~~~~~~~~')
		console.log(1)
		req.fields = req.fields || [];
		req.files = req.files || [];

		const form = new formidable.IncomingForm();
		console.log(2)
		// specify that we want to allow the user to upload multiple files in a single request
		form.multiples = true;

		// Limits the amount of memory all fields together (except files) can allocate in bytes.
		// If this value is exceeded, an 'error' event is emitted. The default size is 2MB.
		form.maxFieldsSize = 5 * 1024 * 1024;
		console.log(3)
		form.on('file', (field, file) => {
			console.log(4)
			req.fields.push(field);
			req.files.push(file);
		});

		// log any errors that occur
		form.on('error', (err) => {
			console.log(5)
			console.log('An error has occured: \n' + err);
			next();
		});

		// once all the files have been uploaded, send a response to the client
		form.on('end', () => {
			console.log(6)
			next();
		});

		console.log(7)

		form.parse(req);
	}
}

module.exports = formidableMiddleware;