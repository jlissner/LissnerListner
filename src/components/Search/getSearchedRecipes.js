import { createSelector } from 'reselect';
import _filter from 'lodash/filter';
import _lowerCase from 'lodash/lowerCase';
import getFilteredRecipes from '../Filter/getFilteredRecipes';

const getSearchedRecipes = createSelector(
  getFilteredRecipes,
  state => state.search.recipes,
  (recipes, search) => {
    if (search.length === 0) {
      return recipes;
    }

    return _filter(recipes, (recipe) => _lowerCase(JSON.stringify(recipe)).indexOf(_lowerCase(search)) > -1)
  }
);

export default getSearchedRecipes;
