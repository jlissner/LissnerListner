import { createSelector } from 'reselect';
import _intersectionWith from 'lodash/intersectionWith';
import qs from 'query-string';

export function getIsFavorite(location) {
  const parsedQueryString = qs.parse(location.search);

  return parsedQueryString.favorite === 'true';
}

export function favoriteRecipes(recipes, user, favorite) {
  if (!favorite) {
    return recipes;
  }

  return _intersectionWith(recipes, user.favorites, (a, b) => a.idPk === b)
}

const getFavoriteRecipes = createSelector(
  state => state.recipes,
  state => state.user.activeUser,
  (state, props) => getIsFavorite(props.location),
  favoriteRecipes
);

export default getFavoriteRecipes;
