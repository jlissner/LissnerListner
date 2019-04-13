import { createSelector } from 'reselect';
import getFilteredRecipes from '../Filter/getFilteredRecipes';
import getSearchedRecipes from '../Search/getSearchedRecipes';
import _intersectionWith from 'lodash/intersectionWith';
import _isEqual from 'lodash/isEqual';

const getSearchedFilteredRecipes = createSelector(
  getFilteredRecipes,
  getSearchedRecipes,
  (filteredRecipes, searchedRecipes) => {
    return _intersectionWith(filteredRecipes, searchedRecipes, _isEqual);
  });

export default getSearchedFilteredRecipes;
