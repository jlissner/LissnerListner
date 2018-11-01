import { connect } from 'react-redux';
import { actions as recipeActions } from './RecipeActions'
import { actions as recipeFormActions } from './RecipeForm/RecipeFormActions'
import RecipeList from './RecipeList';
import getFilteredRecipes from '../Filter/getFilteredRecipes';

const mapStateToProps = (state) => ({
  recipes: getFilteredRecipes(state),
});

const mapActionsToProps = {
  ...recipeActions,
  ...recipeFormActions,
}

export default connect(mapStateToProps, mapActionsToProps)(RecipeList);
