import { combineReducers } from 'redux';
import recipes from '../components/Recipe/RecipeActions';
import recipeForm from '../components/Recipe/RecipeForm/RecipeFormActions';
import quotes from '../components/Quotes/QuotesActions';
import tags from '../components/Tags/TagsActions';
import user from '../components/User/UserActions';
import sections from '../globalState/sections';

const reducers = (asyncReducers) => combineReducers({
  sections,
  recipes,
  recipeForm,
  quotes,
  tags,
  user,
  ...asyncReducers,
})

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) { return; }

  store.asyncReducers[key] = reducer;
  store.replaceReducer(reducers(store.asyncReducers));
}

export default reducers