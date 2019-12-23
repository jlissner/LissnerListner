import { createSelector } from 'reselect';
import _intersectionBy from 'lodash/intersectionBy';
import _get from 'lodash/get';
import _map from 'lodash/map';
import getFilteredRecipes from '../Filter/getFilteredRecipes';
import getSearchedRecipes from '../Search/getSearchedRecipes';

const getNumberOfFavoriteRecipes = createSelector(
  getFilteredRecipes,
  getSearchedRecipes,
  state => _get(state, 'user.activeUser.favorites', []),
  (filteredRecipes, searchedRecipes, favoriteRecipeIds) => {
  	const favoriteRecipes = _map(favoriteRecipeIds, idPk => ({ idPk }));

  	return _intersectionBy(filteredRecipes, searchedRecipes, favoriteRecipes, 'idPk').length;
  });

export default getNumberOfFavoriteRecipes;
