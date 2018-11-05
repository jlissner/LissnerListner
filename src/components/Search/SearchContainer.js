import { connect } from 'react-redux';
import { actions as searchActions } from './SearchActions';
import Search from './Search';

const mapStateToProps = (state, props) => ({
  search: state.search,
  ...props,
})

const mapActionsToProps = {
  ...searchActions,
};

export default connect(mapStateToProps, mapActionsToProps)(Search);
