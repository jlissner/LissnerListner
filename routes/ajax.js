const express        = require('express');
const formidable     = require('formidable');
const path           = require('path');
const isLoggedIn     = require('../middleware/isLoggedIn');
const pickTable      = require('../modules/pickTable');
const s3             = require('../modules/s3');
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

router.get('/getFiles', isLoggedIn(), (req, res) => {
	s3.getFiles((data) => {
		if(!data) {
			res.status(500).send('No Data To Return')
		}

		res.send(data);
	})
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

router.post('/upload', isLoggedIn(), (req, res) => {
	const form = new formidable.IncomingForm();

	// specify that we want to allow the user to upload multiple files in a single request
	form.multiples = true;

	console.log(1);
	
	form.on('file', function(field, file) {
		const fileName = file.name.split('.');
		fileName.pop();
		console.log(2);

		s3.uploadImage(file.path, {path: fileName.join('')}, function(err, versions, meta) {
			console.log(3);
			if (err) {console.log(err); res.status(500).send(err); return;}
			console.log(4);
			res.send('success');
		});
	});


	// log any errors that occur
	form.on('error', function(err) {
		console.log(5);
		console.log('An error has occured: \n' + err);
	});

	// once all the files have been uploaded, send a response to the client
	form.on('end', function() {
	});

	form.parse(req);
});

module.exports = router;