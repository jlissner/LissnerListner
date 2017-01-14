const express        = require('express');
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

router.post('/upload', (req, res) => {
	s3.upload('../../Stellaroute/website/public/images/index-bg.jpg', {}, function(err, versions, meta) {
		if (err) {console.log(err); res.status(500).send(err);return;}

		res.send('success');
		versions.forEach(function(image) {
			console.log(image.width, image.height, image.url);
		});
	});
});

module.exports = router;