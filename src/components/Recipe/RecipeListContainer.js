import { connect } from 'react-redux';
import RecipeList from './RecipeList';
import getSearchedFilteredRecipes from './getSearchedFilteredRecipes';

const mapStateToProps = (state) => ({
  recipes: state.recipes,
  searchedRecipes: getSearchedFilteredRecipes(state),
});

const mapActionsToProps = {
}

export default connect(mapStateToProps, mapActionsToProps)(RecipeList);
