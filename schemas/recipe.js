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
		note: String,
		ethnicity: Array,
		dishType: Array,
		time: String,
		serves: String,
		ingredientSections: [{
			title: String,
			ingredients: Array,
		}],
		directions: [{
			title: String,
			steps: Array,
		}],
		suggestedDishes: Array, // array of id's for other dishes that would go well with this one
		isGlutenFree: Boolean,
		isVegetarian: Boolean,
		isDairyFree: Boolean
	},
	
	HASH: 'Id',
	HASHType: 'S',
	CacheDuration: 60*60*24, // 24h -- node-cache timing is in seconds, not miliseconds
}, null, false);

module.exports = Recipe;