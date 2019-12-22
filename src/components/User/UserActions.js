import _find from 'lodash/find';
import _map from 'lodash/map';
import _pick from 'lodash/pick';
import { getCurrentUser, logout as userLogout } from '../../lib/authentication';

export const LOGIN = 'USER::LOGIN';
export const LOGIN_SUCCESS = 'USER::LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'USER::LOGIN_FAILURE';
export const UPDATE = 'USER::UPDATE'
export const LOGOUT = 'USER::LOGOUT';

export function setUser() {
  return async (dispatch) => {

    try {
      const activeUser = await getCurrentUser();

      if (!activeUser) {
        return dispatch({type: LOGIN_FAILURE});
      }

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { activeUser },
          // users: formattedUsers,
      });
    } catch (err) {
      console.error(err)

      return dispatch({type: LOGIN_FAILURE});
    }
  }
}

export function logout() {
  userLogout()

  return {
    type: LOGOUT
  }
}

export function updateUser(user) {
  return async (dispatch) => {
//     const updatedUser = await invokeApig({
//       path: '/users',
//       method: 'put',
//       body: _pick(user, ['Id', 'favoriteRecipes']),
//     });
// 
//     dispatch({
//       type: UPDATE,
//       payload: updatedUser.data,
//     })
  }
}

export const actions = {
  setUser,
  updateUser,
  logout,
}

const ACTION_HANDLERS = {
  [LOGIN_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      authenticating: false,
      ...payload,
    };
  },
  [LOGIN_FAILURE]: (state, { payload }) => {
    return {
      ...state,
      authenticating: false,
    };
  },
  [UPDATE]: (state, { payload }) => {
    return {
      ...state,
      activeUser: {
        ...state.activeUser,
        ...payload,
      }
    };
  },
  [LOGOUT]: (state) => {
    return {
      ...state,
      activeUser: {
        id: '',
        attributes: [],
        favoriteRecipes: [],
      },
    };
  }
}

const initialState = {
  authenticating: true,
  activeUser: {
    id: '',
    attributes: [],
    favoriteRecipes: [],
  },
  users: []
}

export default function gamePlayByPlayReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}