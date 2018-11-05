import { combineReducers } from 'redux';
import recipesReducer from '../components/Recipe/RecipeActions';
import recipeFormReducer from '../components/Recipe/RecipeForm/RecipeFormActions';
import filtersReducer from '../components/Filter/FilterActions';
import searchReducer from '../components/Search/SearchActions';
import tagsReducer from '../components/Tags/TagsActions';
import userReducer from '../components/User/UserActions';

const reducers = (asyncReducers) => combineReducers({
  recipes: recipesReducer,
  recipeForm: recipeFormReducer,
  filters: filtersReducer,
  search: searchReducer,
  tags: tagsReducer,
  user: userReducer,
  ...asyncReducers,
})

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) { return; }

  store.asyncReducers[key] = reducer;
  store.replaceReducer(reducers(store.asyncReducers));
}

export default reducers