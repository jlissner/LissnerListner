import React, { useContext, useMemo } from 'react';
import _intersectionBy from 'lodash/intersectionBy';
import _get from 'lodash/get';
import _map from 'lodash/map';
import UserContext from '../context/UserContext';
import useFilteredRecipes from './useFilteredRecipes';
import useSearchedRecipes from './useSearchedRecipes';

function useNumberOfFavoriteRecipes() {
  const [ user ] = useContext(UserContext);
  const filteredRecipes = useFilteredRecipes();
  const searchedRecipes = useSearchedRecipes();
  const { favoriteRecipes = [] } = user;
  const favoriteRecipeIds = _map(favoriteRecipes, Id => ({ Id }));
  const numberOfFavoriteRecipes = useMemo(() => (
    _intersectionBy(filteredRecipes, searchedRecipes, favoriteRecipeIds, 'Id').length
  ), [filteredRecipes, searchedRecipes]);

  return numberOfFavoriteRecipes;
}

export default useNumberOfFavoriteRecipes;
