import { connect } from 'react-redux';
import { actions as recipeActions } from './RecipeActions';
import { actions as userActions } from '../User/UserActions';
import { actions as recipeFormActions } from './RecipeForm/RecipeFormActions';
import RecipeList from './RecipeList';
import getSearchedRecipes from '../Search/getSearchedRecipes';

const mapStateToProps = (state) => ({
  recipes: state.recipes,
  searchedRecipes: getSearchedRecipes(state, {category: 'recipes'}),
  activeUser: state.user.activeUser,
});

const mapActionsToProps = {
  ...recipeActions,
  ...recipeFormActions,
  ...userActions,
}

export default connect(mapStateToProps, mapActionsToProps)(RecipeList);
