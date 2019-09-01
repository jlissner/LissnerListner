import { createSelector } from 'reselect';
import _intersectionBy from 'lodash/intersectionBy';
import getFilteredRecipes from '../Filter/getFilteredRecipes';
import getSearchedRecipes from '../Search/getSearchedRecipes';
import getFavoriteRecipes from '../Favorite/getFavoriteRecipes';

const getRecipeList = createSelector(
  getFilteredRecipes,
  getSearchedRecipes,
  getFavoriteRecipes,
  (filteredRecipes, searchedRecipes, favoriteRecipes) => {
  	return _intersectionBy(filteredRecipes, searchedRecipes, favoriteRecipes, 'Id');
  });

export default getRecipeList;
