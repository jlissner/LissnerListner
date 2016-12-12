const Duck = require('../modules/duck');

const Recipe = Duck({
	Table: 'LissnerRecipes',
	Item: {
		Id: String,
		url: String,
		name: String,
		author: String,
		image: String,
		difficulty: String,
		description: String,
		type: Array,
		time: String,
		serves: String,
		ingredients: [{
			title: String,
			ingredients: Array,
		}],
		directions: [{
			Id: String,
			order: Number,
			direction: String
		}],
		isGlutenFree: Boolean,
		isVegetarian: Boolean,
		isDairyFree: Boolean
	},
	
	HASH: 'Id',
	HASHType: 'S',
	CacheDuration: 60*60*24, // 24h -- node-cache timing is in seconds, not miliseconds
}, null, false);

module.exports = Recipe;