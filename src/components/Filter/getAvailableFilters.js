import { createSelector } from 'reselect';
import _find from 'lodash/find';
import _transform from 'lodash/transform';
import _sortBy from 'lodash/sortBy';
import _filter from 'lodash/filter';
import _intersectionWith from 'lodash/intersectionWith';
import _isEqual from 'lodash/isEqual';
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
        const searchedFilteredRecipes = _intersectionWith(filteredRecipes, searchedRecipes, _isEqual)

        tag.disabled = !_filter(searchedFilteredRecipes, (recipe) => _find(recipe.tags, filter)).length;

         // = disabledBySearch || disabledByFilter;
        tag.checked = Boolean(_find(filters, filter));

        memo[tag.category] = memo[tag.category] || [];
        memo[tag.category].push(tag);
        memo[tag.category] = _sortBy(memo[tag.category], ['listOrder']);
    }, {});
  });

export default getAvailableFilters;
