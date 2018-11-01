import { invokeApig } from '../../lib/awsLib';

export const GET_TAGS = 'TAGS::GET_TAGS';
export const SET_TAGS = 'TAGS::SET_TAGS';

export function getTags() {
  return async (dispatch) => {
    dispatch({ type: GET_TAGS })

    const tags = await invokeApig({ path: '/tags' })

    dispatch(setTags(tags))
  }
}

export function setTags(tags) {
  return {
    type: SET_TAGS,
    payload: tags,
  }
}

export const actions = {
  getTags,
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