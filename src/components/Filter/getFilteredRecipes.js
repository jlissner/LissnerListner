import { createSelector } from 'reselect';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import _uniqBy from 'lodash/uniqBy';

const getFilteredRecipes = createSelector(
  state => state.recipes,
  state => state.filters,
  (recipes, filters) => {
    if (filters.length === 0) {
      return recipes;
    }

    const numberOfCategories = _uniqBy(filters, 'category').length

    return _filter(recipes, (recipe) => {
      const appliedFilters = _filter(filters, (filter) => _find(recipe.tags, filter))
      const numberOfAppliedCategories = _uniqBy(appliedFilters, 'category').length

      return numberOfAppliedCategories === numberOfCategories
    });
  });

export default getFilteredRecipes;
