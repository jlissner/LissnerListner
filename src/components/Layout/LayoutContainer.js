import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions as recipeFormActions } from '../Recipe/RecipeForm/RecipeFormActions';
import Layout from './Layout';

const mapStateToProps = (state) => ({
  drawer: state.app.drawer,
});

const mapActionsToProps = {
	...recipeFormActions,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Layout));
