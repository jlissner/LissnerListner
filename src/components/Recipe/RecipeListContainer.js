import { connect } from 'react-redux';
import { actions as recipeFormActions } from './RecipeForm/RecipeFormActions';
import RecipeList from './RecipeList';
import getSearchedFilteredRecipes from './getSearchedFilteredRecipes';

const mapStateToProps = (state) => ({
  recipes: state.recipes,
  searchedRecipes: getSearchedFilteredRecipes(state),
});

const mapActionsToProps = {
  ...recipeFormActions,
}

export default connect(mapStateToProps, mapActionsToProps)(RecipeList);
