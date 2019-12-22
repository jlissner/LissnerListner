import React, { useContext, useMemo } from 'react';
import _intersectionWith from 'lodash/intersectionWith';
import qs from 'query-string';
import CookbookContext from '../context/CookbookContext';
import UserContext from '../context/UserContext';

export function getIsFavorite(location) {
  const parsedQueryString = qs.parse(location.search);

  return parsedQueryString.favorite === 'true';
}

function useFavoriteRecipes(location) {
  const [ cookbook, setCookbook ] = useContext(CookbookContext);
  const [ user ] = useContext(UserContext);
  const favorite = getIsFavorite(location);
  const { recipes } = cookbook;
  const { favorites } = user;
  const favoriteRecipes = useMemo(() => {
    if (!favorite) {
      return recipes;
    }

    return _intersectionWith(recipes, favorites, (a, b) => a.idPk === b)
  }, [location]);

  return favoriteRecipes
}

export default useFavoriteRecipes;
