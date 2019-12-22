import React, { useContext, useMemo } from 'react';
import _find from 'lodash/find';
import _transform from 'lodash/transform';
import _sortBy from 'lodash/sortBy';
import _filter from 'lodash/filter';
import _intersectionBy from 'lodash/intersectionBy';
import _pick from 'lodash/pick';
import CookbookContext from '../context/CookbookContext';
import UserContext from '../context/UserContext';
import useSearchedRecipes from './useSearchedRecipes';
import useFavoriteRecipes from './useFavoriteRecipes';
import { filterRecipes } from './useFilteredRecipes';

function useAvailableFilters(location) {
  const [ cookbook, setCookbook ] = useContext(CookbookContext);
  const searchedRecipes = useSearchedRecipes();
  const favoriteRecipes = useFavoriteRecipes(location);
  const { filters, tags, recipes } = cookbook;
  const availableRecipes = useMemo(() => {
    return _transform(tags, (memo, tag) => {
      const filter = _pick(tag, ['category', 'label']);
      const filteredRecipes = filterRecipes(recipes, [...filters, filter])
      const searchedFilteredRecipes = _intersectionBy(filteredRecipes, searchedRecipes, favoriteRecipes, 'idPk')
      const availableRecipes = _filter(searchedFilteredRecipes, (recipe) => _find(recipe.tags, filter));

      tag.checked = Boolean(_find(filters, filter));
      tag.numberOfRecipes = availableRecipes.length;

      memo[tag.category] = memo[tag.category] || [];
      memo[tag.category].push(tag);
      memo[tag.category] = _sortBy(memo[tag.category], ['listOrder']);
    }, {});
  }, [searchedRecipes, favoriteRecipes]);


  return availableRecipes
}

export default useAvailableFilters;
