import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions as filterActions } from './FilterActions';
import FilterItem from './FilterItem';

const mapStateTopProps = (state) => ({
});

const mapActionsToProps = {
  ...filterActions,
}

export default withRouter(connect(mapStateTopProps, mapActionsToProps)(FilterItem))