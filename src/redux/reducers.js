import { combineReducers } from 'redux';
import recipes from '../globalState/recipes';
import recipeForm from '../globalState/recipeForm';
import quotes from '../globalState/quotes';
import tags from '../globalState/tags';
import user from '../globalState/user';
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