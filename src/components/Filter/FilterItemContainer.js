import { connect } from 'react-redux';
import { actions as filterActions } from './FilterActions';
import getFilteredRecipes from './getFilteredRecipes';
import FilterItem from './FilterItem';

const mapStateTopProps = (state) => ({
});

const mapActionsToProps = {
  ...filterActions,
}

export default connect(mapStateTopProps, mapActionsToProps)(FilterItem)