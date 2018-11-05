import { createSelector } from 'reselect';
import _find from 'lodash/find';
import _transform from 'lodash/transform';
import _sortBy from 'lodash/sortBy';
import _filter from 'lodash/filter';
import _pick from 'lodash/pick';
import getFilteredRecipes from './getFilteredRecipes';

const getAvailableFilters = createSelector(
  (state, props) => state.filters[props.category],
  state => state.tags,
  getFilteredRecipes,
  (filters, tags, recipes) => {
    return _transform(tags, (memo, tag) => {
        memo[tag.category] = memo[tag.category] || [];
        const filter = _pick(tag, ['category', 'label']);

        tag.checked = Boolean(_find(filters, filter));
        tag.disabled = !_filter(recipes, (recipe) => _find(recipe.tags, filter)).length;

        memo[tag.category].push(tag);

        memo[tag.category] = _sortBy(memo[tag.category], ['listOrder']);
    }, {});
  });

export default getAvailableFilters;
