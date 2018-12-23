import { connect } from 'react-redux';
import { actions as recipeActions } from './RecipeActions';
import { actions as userActions } from '../User/UserActions';
import { actions as appActions } from '../App/AppActions';
import { actions as searchActions } from '../Search/SearchActions';
import { actions as filterActions } from '../Filter/FilterActions';
import { actions as recipeFormActions } from './RecipeForm/RecipeFormActions';
import RecipeList from './RecipeList';
import getSearchedRecipes from '../Search/getSearchedRecipes';

const mapStateToProps = (state) => ({
  drawer: state.app.drawer,
  recipes: state.recipes,
  searchedRecipes: getSearchedRecipes(state, {category: 'recipes'}),
  activeUser: state.user.activeUser,
});

const mapActionsToProps = {
  ...appActions,
  ...filterActions,
  ...recipeActions,
  ...recipeFormActions,
  ...searchActions,
  ...userActions,
}

export default connect(mapStateToProps, mapActionsToProps)(RecipeList);
