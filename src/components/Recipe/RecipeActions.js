import _get from 'lodash/get';
import graphql from '../../lib/graphql';

export const GET_RECIPES = 'RECIPES::GET_RECIPES';
export const SET_RECIPES = 'RECIPES::SET_RECIPES';
export const ADD_RECIPE = 'RECIPES::ADD_RECIPE';

export function getRecipes() {
  return async (dispatch) => {
    dispatch({ type: GET_RECIPES })

    const body = {
      query: `
        query {
          cookbookByIdPk(idPk: "1") {
            recipes {
              nodes {
                idPk
                authorFk
                name
                directions
                ingredients
                tags
                additionalAttributes
                comments
              }
            }
          }
        }
      `
    }
    const res = await graphql(body);
    const recipes = _get(res, 'cookbookByIdPk.recipes.nodes', []);

    dispatch(setRecipes(recipes))
  }
}

export function setRecipes(recipes) {
  return {
    type: SET_RECIPES,
    payload: recipes,
  }
}

export const actions = {
  getRecipes,
}

const ACTION_HANDLERS = {
  [SET_RECIPES]: (state, action) => {
    return [...action.payload]
  },
}

const initialState = []

export default function recipeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}