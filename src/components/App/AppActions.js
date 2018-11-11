export const OPEN_DRAWER = 'APP::OPEN_DRAWER';
export const CLOSE_DRAWER = 'APP::CLOSE_DRAWER';
export const TOGGLE_DRAWER = 'APP::TOGGLE_DRAWER';

function openDrawer() {
  return {
    type: OPEN_DRAWER,
  };
}

function closeDrawer() {
  return {
    type: CLOSE_DRAWER,
  };
}

function toggleDrawer() {
  return {
    type: TOGGLE_DRAWER,
  };
}

export const actions = {
  openDrawer,
  closeDrawer,
  toggleDrawer,
}

const ACTION_HANDLERS = {
  [OPEN_DRAWER]: (state) => {
    return {
      ...state,
      drawer: true,
    }
  },
  [CLOSE_DRAWER]: (state) => {
    return {
      ...state,
      drawer: false,
    }
  },
  [TOGGLE_DRAWER]: (state) => {
    return {
      ...state,
      drawer: !state.drawer,
    }
  }
}

const initialState = {
  drawer: true,
}

export default function reducer(state = initialState, action = {}) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}