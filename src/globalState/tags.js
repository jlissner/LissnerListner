import _get from 'lodash/get';
import graphql from '../lib/graphql';

export const GET_TAGS = 'TAGS::GET_TAGS';
export const SET_TAGS = 'TAGS::SET_TAGS';

export function getTags() {
  return async (dispatch) => {
    dispatch({ type: GET_TAGS })

    const body = {
      query: `
        query {
          cookbookByIdPk(idPk: "1") {
            cookbookTagsByCookbookFk(orderBy: LIST_ORDER_ASC) {
              nodes {
                category
                label
                type
              }
            }
          }
        }
      `
    }

    const res = await graphql(body);
    const tags = _get(res, 'cookbookByIdPk.cookbookTagsByCookbookFk.nodes', []);

    dispatch(setTags(tags))
  }
}

export function setTags(tags) {
  return {
    type: SET_TAGS,
    payload: tags,
  }
}

const ACTION_HANDLERS = {
  [SET_TAGS]: (state, action) => {
    return [...action.payload]
  },
}

const initialState = []

export default function recipeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}