export const SET_SEARCH = 'SEARCH::SET_SEARCH';

export function setSearch(search) {
  return {
    type: SET_SEARCH,
    payload: search,
  };
}

export const actions = {
  setSearch,
}

const ACTION_HANDLERS = {
  [SET_SEARCH]: (state, action) => {
    return {
      ...state,
      [action.payload.category]: action.payload.value
    }
  },
}

const initialState = {
  recipes: '',
}

export default function searchReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}