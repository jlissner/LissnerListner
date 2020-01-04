export const SET_SEARCH = 'SEARCH::SET_SEARCH';
export const RESET_SEARCH = 'SEARCH::RESET_SEARCH';

const initialState = '';

export function setSearch(search) {
  return {
    type: SET_SEARCH,
    payload: search,
  };
}

export function resetSearch(search) {
  return {
    type: RESET_SEARCH,
  };
}

export const actions = {
  setSearch,
  resetSearch,
}

const ACTION_HANDLERS = {
  [SET_SEARCH]: (state, action) => {
    return action.payload;
  },
  [RESET_SEARCH]: (state, action) => {
    return initialState
  }
}

export default function searchReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}