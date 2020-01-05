import { toast } from 'react-toastify'
import _cloneDeep from 'lodash/cloneDeep';
import _forEach from 'lodash/forEach';
import _get from 'lodash/get';
import graphql, { objToGraphqlStr } from '../lib/graphql';
import { getRecipes } from './recipes';

const initialState = {
  open: false,
  saving: false,
  name: '',
  ingredients: [{ title: '', ingredients: []}],
  directions: [{ title: '', steps: []}],
  author: '',
  description: '',
  note: '',
  cookTime: '',
  serves: '',
  tags: [],
}

export const OPEN_FORM = 'RECIPE_FORM::OPEN_FORM';
export const CLOSE_FORM = 'RECIPE_FORM::CLOSE_FORM';
export const SET_FORM = 'RECIPE_FORM::SET_FORM';
export const RESET_FORM = 'RECIPE_FORM::RESET_FORM';
export const SET_VALUE = 'RECIPE_FORM::SET_VALUE';
export const SAVE_FORM = 'RECIPE_FORM::SAVE_FORM';
export const SAVE_FORM_SUCCESSFUL = 'RECIPE_FORM::SAVE_FORM_SUCCESSFUL';
export const DELETE = 'RECIPE_FORM::DELETE';
export const DELETE_SUCCESS = 'RECIPE_FORM::DELETE_SUCCESS';
export const DELETE_FAILURE = 'RECIPE_FORM::DELETE_FAILURE';

export function openForm() {
  return { type: OPEN_FORM };
}
export function closeForm() {
  return { type: CLOSE_FORM };
}

export function setForm(_recipeForm) {
  const recipeForm = _cloneDeep(_recipeForm);

  recipeForm.open = recipeForm.open || false;
  recipeForm.directions = recipeForm.directions || [{ title: '', steps: []}]
  recipeForm.ingredients = recipeForm.ingredients || [{ title: '', ingredients: []}]
  recipeForm.author = recipeForm.author || _get(recipeForm, 'additionalAttributes.author') || '';
  recipeForm.cookTime = recipeForm.cookTime || _get(recipeForm, 'additionalAttributes.cookTime') || '';
  recipeForm.description = recipeForm.description || _get(recipeForm, 'additionalAttributes.description') || '';
  recipeForm.image = recipeForm.image || _get(recipeForm, 'additionalAttributes.image') || '';
  recipeForm.note = recipeForm.note || _get(recipeForm, 'additionalAttributes.note') || '';
  recipeForm.serves = recipeForm.serves || _get(recipeForm, 'additionalAttributes.serves') || '';
  recipeForm.tags = recipeForm.tags || [];

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

export function resetForm() {
  return { type: RESET_FORM };
}

function newRecipe(params) {
  const body = {
    query: `
      mutation {
        createRecipe(input: {
          ${objToGraphqlStr(params)}
        }) {
          clientMutationId
        }
      }
    `
  };

  return graphql(body);
}

function updateRecipe(params) {
  const body = {
    query: `
      mutation {
        updateRecipe(input: {
          ${objToGraphqlStr(params)}
        }) {
          clientMutationId
        }
      }
    `
  };

  return graphql(body);
}

export function saveForm(){
  return async (dispatch, getState) => {
    dispatch({ type: SAVE_FORM })

    const { recipeForm } = getState();
    const {
      idPk,
      name,
      ingredients,
      directions,
      author,
      description,
      note,
      cookTime,
      serves,
      tags,
    } = recipeForm;
    const params = {
      cookbookId: '1',
      name,
      ingredients,
      directions,
      additionalAttributes: {
        author,
        description,
        note,
        cookTime,
        serves,
      },
      tags,
    };

    if (idPk) {
      await updateRecipe({recipeId: idPk, ...params});
    } else {
      await newRecipe(params);
    }

    dispatch({ type: SAVE_FORM_SUCCESSFUL })
    dispatch(getRecipes())
  }
}

export function deleteRecipe(idPk) {
  return async (dispatch) => {
    dispatch({ type: DELETE });

    try {
      const body = {
        query: `
          mutation {
            deleteRecipeByIdPk(input: {idPk: "${idPk}"}) {
              clientMutationId
            }
          }
        `
      };

      await graphql(body);
      toast.success('Successfully Deleted Recipe');

      dispatch({ type: DELETE_SUCCESS });
      dispatch(getRecipes());
    } catch (err) {
      toast.error(err.message);

      dispatch({ type: DELETE_FAILURE, payload: err });
    }
  }
}

const ACTION_HANDLERS = {
  [OPEN_FORM]: (state) => {
    return { ...state, open: true };
  },
  [CLOSE_FORM]: (state) => {
    return { ...state, open: false };
  },
  [DELETE_SUCCESS]: (state) => {
    return { ...state, open: false };
  },
  [SET_FORM]: (state, action) => {
    return { ...action.payload };
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
  [RESET_FORM]: (state, action) => {
    return _cloneDeep(initialState);
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

export default function recipeReducer(state = _cloneDeep(initialState), action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}