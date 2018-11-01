import { createSelector } from 'reselect';
import _transform from 'lodash/transform'
import _sortBy from 'lodash/sortBy'

const getFilteredRecipes = createSelector(
  state => state.tags,
  (tags) => {
    return _transform(tags, (memo, tag) => {
        memo[tag.category] = memo[tag.category] || [];
        memo[tag.category].push(tag);

        memo[tag.category] = _sortBy(memo[tag.category], ['listOrder'])
    }, {});
  });

export default getFilteredRecipes;
