import { createSelector } from 'reselect';
import _find from 'lodash/find';
import _transform from 'lodash/transform';
import _sortBy from 'lodash/sortBy';
import _filter from 'lodash/filter';
import _intersectionBy from 'lodash/intersectionBy';
import _pick from 'lodash/pick';
import getSearchedRecipes from '../Search/getSearchedRecipes';
import { filterRecipes } from './getFilteredRecipes';

const getAvailableFilters = createSelector(
  (state, props) => state.filters[props.category],
  state => state.tags,
  (state, props) => state[props.category],
  getSearchedRecipes,
  (filters, tags, allRecipes, searchedRecipes) => {
    return _transform(tags, (memo, tag) => {
        const filter = _pick(tag, ['category', 'label']);
        const filteredRecipes = filterRecipes(allRecipes, [...filters, filter])
        const searchedFilteredRecipes = _intersectionBy(filteredRecipes, searchedRecipes, 'Id')
        const availableRecipes = _filter(searchedFilteredRecipes, (recipe) => _find(recipe.tags, filter));

        tag.checked = Boolean(_find(filters, filter));
        tag.numberOfRecipes = availableRecipes.length;

        memo[tag.category] = memo[tag.category] || [];
        memo[tag.category].push(tag);
        memo[tag.category] = _sortBy(memo[tag.category], ['listOrder']);
    }, {});
  });

export default getAvailableFilters;
