import React, { useContext, useMemo } from 'react';
import CookbookContext from '../context/CookbookContext';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import _uniqBy from 'lodash/uniqBy';

export function filterRecipes(recipes, filters) {
  if (filters.length === 0) {
    return recipes;
  }

  const numberOfCategories = _uniqBy(filters, 'category').length

  return _filter(recipes, (recipe) => {
    const appliedFilters = _filter(filters, (filter) => _find(recipe.tags, filter))
    const numberOfAppliedCategories = _uniqBy(appliedFilters, 'category').length

    return numberOfAppliedCategories === numberOfCategories
  });  
}

function useFilteredRecipes() {
  const [ cookbook, setCookbook ] = useContext(CookbookContext);
  const { recipes, filters } = cookbook;
  const filteredRecipes = useMemo(() => {
    return filterRecipes(recipes, filters);
  }, [filters]);

  return filteredRecipes;
}

export default useFilteredRecipes;
