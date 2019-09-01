import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions as filterActions } from './FilterActions';
import FilterItem from './FilterItem';

const mapStateTopProps = (state) => ({
});

const mapActionsToProps = (dispatch, ownProps) => ({
  handleClick: () => {
  	const { category, label, subCategory } = ownProps;

  	dispatch(filterActions.toggleFilter({category, value: {label, category: subCategory}}));
  }
})

export default withRouter(connect(mapStateTopProps, mapActionsToProps)(FilterItem))