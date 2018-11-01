import _concat from 'lodash/concat'
import _find from 'lodash/find'
import _filter from 'lodash/filter'
import _uniq from 'lodash/uniq'

export const SET_FILTERS = 'FILTERS::SET_FILTERS';
export const ADD_FILTER = 'FILTERS::ADD_FILTER';
export const REMOVE_FILTER = 'FILTERS::REMOVE_FILTER';
export const TOGGLE_FILTER = 'FILTERS::TOGGLE_FILTER';

export function setFilters(filters) {
  return {
    type: SET_FILTERS,
    payload: filters,
  };
}

export function addFilter(filter) {
  return {
    type: ADD_FILTER,
    payload: filter,
  };
}

export function removeFilter(filter) {
  return {
    type: REMOVE_FILTER,
    payload: filter,
  };
}

export function toggleFilter(filter) {
  return (dispatch, getState) => {
    dispatch({ type: TOGGLE_FILTER, payload: filter });

    const filters = getState().filters;
    const alreadyExists = _find(filters, filter);

    if (alreadyExists) {
      dispatch(removeFilter(filter))
    } else {
      dispatch(addFilter(filter))
    }
  }
}

export const actions = {
  setFilters,
  addFilter,
  removeFilter,
  toggleFilter,
}

const ACTION_HANDLERS = {
  [ADD_FILTER]: (state, action) => {
    return _uniq(_concat(state, action.payload))
  },
  [REMOVE_FILTER]: (state, action) => {
    return _filter(state, (filter) => JSON.stringify(filter) !== JSON.stringify(action.payload))
  },
  [SET_FILTERS]: (state, action) => {
    return action.payload
  },
}

const initialState = []

export default function recipeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}