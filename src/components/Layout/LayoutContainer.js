import { connect } from 'react-redux';
import Layout from './Layout';

const mapStateToProps = (state) => ({
  drawer: state.app.drawer,
});

export default connect(mapStateToProps)(Layout);
