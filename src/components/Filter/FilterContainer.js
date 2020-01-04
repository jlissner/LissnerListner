import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions as filterActions } from './FilterActions';
import getAvailableFilters from './getAvailableFilters';
import getNumberOfFavoriteRecipes from '../Favorite/getNumberOfFavoriteRecipes';
import Filter from './Filter';

const mapStateTopProps = (state, props) => ({
  availableFilters: getAvailableFilters(state, props),
  numberOfFavoriteRecipes: getNumberOfFavoriteRecipes(state, props),
  filters: state.filters,
  tags: state.tags,
});

const mapActionsToProps = {
  ...filterActions,
}

export default withRouter(connect(mapStateTopProps, mapActionsToProps)(Filter))