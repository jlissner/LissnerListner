const express    = require('express');
const flash      = require('connect-flash');
const passport   = require('passport');
const strategies = require('../config/passport');
const isLoggedIn = require('../middleware/isLoggedIn');
const setFlash   = require('../modules/setFlash');
const sortBy     = require('../modules/sortBy');
const User       = require('../schemas/user');
const Recipe     = require('../schemas/recipe');
const router     = express.Router();

strategies.local(passport);

router.get('/', (req, res, next) => {
	res.render('index', {
		recipes: Recipe.find().items || []
	});
});

router.get('/:recipe', (req, res, next) => {
	const recipe = Recipe.findOne('url', req.params.recipe).items;

	if (!recipe){
		next();
		return;
	}

	res.render('pages/recipe', {
		recipe: recipe,
		recipes: Recipe.find().items || []
	});
});

router.get('/profile', isLoggedIn(), (req, res, next) => {
	res.render('profile/profile', {
		key: User.hash,
		users: User.find().items.sort()
	});
});

router.post('/profile/update', isLoggedIn(), (req, res) => {
	if (req.body.delete){
		User.delete(req.body[User.hash]).then(() => {
			// resolved

			req.flash('success', 'User successfully deleted')
			res.redirect('/logout');
			return;
		}, () => {
			// rejected

			req.flash('error', 'Oops, something went wrong. Please try again.');
			res.redirect('/profile');
			return;
		});
	} else if (req.body.update) {
		delete req.body.update;

		const params = req.body;

		if(params['local.password'] && params['local.password'].length > 4){
			params['local.password'] = User.generateHash(params['local.password']);
		} else { 
			delete params['local.password'];
		}

		if(params.isAdmin){
			params.isAdmin = params.isAdmin.indexOf('true') > -1 ? true : false;
		}

		User.update(params, true).then(() => {
			// resolved

			User.updateCache().then(() => {
				req.flash('success', 'User successfully updated');
				res.redirect('/profile');
				return;
			}, (err) => {
				console.error(err);
				req.flash('error', 'Oops, something went wrong. Please try again.');
				res.redirect('/profile');
				return;
			});
		}, (err) => {
			// rejected

			console.error(err);
			req.flash('error', 'Oops, something went wrong. Please try again.');
			res.redirect('/profile');
			return;
		});
	} else {
		req.flash('error', 'There was an error, please try again');
		res.redirect('/profile');
		return;
	}
});

// authentication
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/profile',
	failureRedirect: '/',
	failureFlash: true
}));

router.post('/auth/local', User.getCached(), passport.authenticate('local-login', {
	successRedirect: '/',
	failureRedirect: '/',
	failureFlash: true
}));

module.exports = router;