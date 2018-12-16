import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions as recipeActions } from './RecipeActions';
import { actions as recipeFormActions } from './RecipeForm/RecipeFormActions';
import RecipeDetail from './RecipeDetail';

const mapStateToProps = (state) => ({
  recipes: state.recipes,
  user: state.user,
});

const mapActionsToProps = {
  ...recipeActions,
  ...recipeFormActions,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(RecipeDetail));
