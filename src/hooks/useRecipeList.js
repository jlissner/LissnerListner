import React, { useContext, useMemo } from 'react';
import _intersectionBy from 'lodash/intersectionBy';
import useFilteredRecipes from './useFilteredRecipes';
import useSearchedRecipes from './useSearchedRecipes';
import useFavoriteRecipes from './useFavoriteRecipes';

function useRecipeList(location) {
  const filteredRecipes = useFilteredRecipes();
  const searchedRecipes = useSearchedRecipes();
  const favoriteRecipes = useFavoriteRecipes(location);
  const recipeList = useMemo(() => {
    return _intersectionBy(filteredRecipes, searchedRecipes, favoriteRecipes, 'idPk');
  }, [filteredRecipes, searchedRecipes, favoriteRecipes]);

  return recipeList;
}

export default useRecipeList;
