const User    = require('../schemas/user');
const Recipe = require('../schemas/recipe');

function pickTable(table) {
	switch(table) {
		case 'Users': {
			return User;
		}
		case 'Recipes': {
			return Recipe;
		}
		default:
			return;
	}
}

module.exports = pickTable;