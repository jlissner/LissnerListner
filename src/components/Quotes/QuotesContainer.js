import { connect } from 'react-redux';
import { actions } from './QuotesActions';
import Quotes from './Quotes';

const mapStateToProps = state => ({
	quotes: state.quotes,
});

const mapActionsToProps = {
	...actions,
}

export default connect(mapStateToProps, mapActionsToProps)(Quotes)