import { connect } from 'react-redux';
import { actions as filterActions } from './FilterActions';
import { actions as tagsActions } from '../Tags/TagsActions';
import getFilteredRecipes from './getFilteredRecipes';
import getAvailableFilters from './getAvailableFilters';
import Filter from './Filter';

const mapStateTopProps = (state) => ({
  recipes: state.recipes,
  filters: getAvailableFilters(state),
  activeFilters: state.filters,
  filteredRecipes: getFilteredRecipes(state),
  tags: state.tags,
});

const mapActionsToProps = {
  ...filterActions,
  ...tagsActions,
}

export default connect(mapStateTopProps, mapActionsToProps)(Filter)