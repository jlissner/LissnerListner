import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import Layout from './Layout';

const mapStateToProps = (state) => ({
  drawer: state.app.drawer,
});

export default withRouter(connect(mapStateToProps)(Layout));
