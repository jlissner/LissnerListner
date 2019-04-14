import { createSelector } from 'reselect';
import getFilteredRecipes from '../Filter/getFilteredRecipes';
import getSearchedRecipes from '../Search/getSearchedRecipes';
import _intersectionBy from 'lodash/intersectionBy';

const getSearchedFilteredRecipes = createSelector(
  getFilteredRecipes,
  getSearchedRecipes,
  (filteredRecipes, searchedRecipes) => {
    return _intersectionBy(filteredRecipes, searchedRecipes, 'Id');
  });

export default getSearchedFilteredRecipes;
