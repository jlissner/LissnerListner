import { connect } from 'react-redux';
import getAvailableFilters from './getAvailableFilters';
import Filter from './Filter';

const mapStateTopProps = (state, props) => ({
  filters: getAvailableFilters(state, props),
  tags: state.tags,
});

const mapActionsToProps = {
}

export default connect(mapStateTopProps, mapActionsToProps)(Filter)