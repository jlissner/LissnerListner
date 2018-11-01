import _forEach from 'lodash/forEach';
import { invokeApig } from '../../../lib/awsLib';
import { getRecipes } from '../RecipeActions';
import _omit from 'lodash/omit';

const initialState = {
  saving: false,
  author: '',
  description: '',
  note: '',
  title: '',
  cookTime: '',
  serves: '',
  ingredients: [{ title: '', ingredients: []}],
  directions: [{ title: '', steps: []}],
  tags: [],
}

export const SET_FORM = 'RECIPE_FORM::SET_FORM';
export const SET_VALUE = 'RECIPE_FORM::SET_VALUE';
export const SAVE_FORM = 'RECIPE_FORM::SAVE_FORM';
export const SAVE_FORM_SUCCESSFUL = 'RECIPE_FORM::SAVE_FORM_SUCCESSFUL';

export function setForm(recipeForm) {
  _forEach(recipeForm.directions, (direction) => direction.title = direction.title || '');
  _forEach(recipeForm.ingredients, (ingredient) => ingredient.title = ingredient.title || '');

  return {
    type: SET_FORM,
    payload: recipeForm,
  }
}

export function setValue(value) {
  return {
    type: SET_VALUE,
    payload: value
  }
}

export function resetForm(){
  return {
    type: SET_FORM,
    payload: initialState,
  }
}

export function saveForm(){
  return async (dispatch, getState) => {
    dispatch({ type: SAVE_FORM })

    const { recipeForm } = getState()

    await invokeApig({
      path: '/recipes',
      method: recipeForm.Id ? 'put' : 'post',
      body: _omit(recipeForm, ['saving']),
    })
    
    dispatch({ type: SAVE_FORM_SUCCESSFUL })
    dispatch(getRecipes())
  }
}

export const actions = {
  setForm,
  setValue,
  saveForm,
  resetForm,
}

const ACTION_HANDLERS = {
  [SET_FORM]: (state, action) => {
    return action.payload
  },
  [SET_VALUE]: (state, action) => {
    const { key, value } = action.payload;

    if (value instanceof Array) {
      return {
        ...state,
        [key]: [...value]
      }
    }

    if (typeof value === 'object') {
      return {
        ...state,
        [key]: {...value}
      }
    }

    return {
      ...state,
      [key]: value
    }
  },
  [SAVE_FORM]: (state, action) => {
    return {
      ...state,
      saving: true,
    }
  },
  [SAVE_FORM_SUCCESSFUL]: (state, action) => {
    return {
      ...state,
      saving: false,
    }
  },
}

export default function recipeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}