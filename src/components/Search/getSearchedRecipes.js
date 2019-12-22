// import { createSelector } from 'reselect';
// import _filter from 'lodash/filter';
// import _lowerCase from 'lodash/lowerCase';
// 
// const getSearchedRecipes = createSelector(
//   state => state.recipes,
//   state => state.search.recipes,
//   (recipes, search) => {
//     if (search.length === 0) {
//       return recipes;
//     }
// 
//     return _filter(recipes, (recipe) => {
//       const words = _lowerCase(search).split(' ');
//       const stringifiedRecipe = _lowerCase(JSON.stringify(recipe));
//       const matchingWords = _filter(words, word => stringifiedRecipe.indexOf(word) > -1)
// 
//       return words.length === matchingWords.length
//     })
//   }
// );
// 
// export default getSearchedRecipes;
