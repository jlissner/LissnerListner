const express        = require('express');
const formidable     = require('formidable');
const path           = require('path');
const fs             = require('fs');
const s3             = require('../config/s3');
const isLoggedIn     = require('../middleware/isLoggedIn');
const pickTable      = require('../modules/pickTable');
const router         = express.Router();

router.get('/get/:table', isLoggedIn(), (req, res) => {
	const field = req.query.field
	const value = req.query.value
	const findOne = req.query.findOne
	const table = pickTable(req.params.table);

	if(!table){
		console.error('Please choose a table.');
		res.status(500).send('Please choose a table.');
	}

	const items = findOne ? table.findOne(field, value).items : table.find(field, value).items

	if(items){
		res.send(items)
	} else {
		res.send('Nothing Found');
	}
});

router.post('/add/:table', isLoggedIn(true), (req, res) => {
	const item = req.body;
	const table = pickTable(req.params.table);

	if(!table){
		console.error('Please choose a table.');
		res.status(500).send('Please choose a table.');
	}

	table.add(item)
	.then(() => {
		table.updateCache().then(() => {
			res.send('success');
		});
	}, (err) => {
		console.error(err);
		res.status(500).send(err);
	});
});

router.post('/update/:table', isLoggedIn(true), (req, res) => {
	const item = req.body;
	const table = pickTable(req.params.table);

	if(!table){
		console.error('Please choose a table.');
		res.status(500).send('Please choose a table.');
	}

	table.update(item)
		.then(() => {
			table.updateCache().then(() => {
				res.send('success');
			});
		}, (err) => {
			console.error(err);
			res.status(500).send(err);
		});
});

router.post('/delete/:table', isLoggedIn(true), (req, res) => {
	const key = req.body['key'];
	const table = pickTable(req.params.table);

	if(!table){
		console.error('Please choose a table.');
		res.status(500).send('Please choose a table.');
	}

	table.delete(key)
	.then(() => {
		table.updateCache().then(() => {
			res.send('success');
		});
	}, (err) => {
		console.error(err);
		res.status(500).send(err);
	});
});


const uploadDir = path.join(__dirname, '../public', '/images/uploads');
router.post('/upload', (req, res) => {
	console.log(1)
	const form = new formidable.IncomingForm();
	console.log(2)
	// specify that we want to allow the user to upload multiple files in a single request
	form.multiples = true;
	console.log(3)
	form.on('file', function(field, file) {
		console.log(4)
		console.log('file.name', file.name);
		fs.rename(file.path, path.join(uploadDir, file.name));
		console.log('path.join(uploadDir, file.name)', path.join(uploadDir, file.name));
		console.log(5)
		s3.upload(path.join(uploadDir, file.name), {}, function(err, versions, meta) {
			console.log(6)
			if (err) {console.log(err); res.status(500).send(err);return;}

			versions.forEach(function(image) {
				console.log(image.width, image.height, image.url);
			});
			res.send('success2');
		});
	});

	// log any errors that occur
	form.on('error', function(err) {
		console.log(7)
		console.log('An error has occured: \n' + err);
	});

	// once all the files have been uploaded, send a response to the client
	form.on('end', function() {
		console.log(8)
	});

	form.parse(req);
});

module.exports = router;