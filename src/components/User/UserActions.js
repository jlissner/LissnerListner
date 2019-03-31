import _find from 'lodash/find';
import _pick from 'lodash/pick';
import { authUser, invokeApig, signOutUser } from '../../lib/awsLib';

export const LOGIN = 'USER::LOGIN';
export const LOGIN_SUCCESS = 'USER::LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'USER::LOGIN_FAILURE';
export const UPDATE = 'USER::UPDATE'
export const LOGOUT = 'USER::LOGOUT';

export function login() {
  return async (dispatch) => {
    try {
      const cognitoUser = await authUser();
      if (!cognitoUser) {
        return dispatch({type: LOGIN_FAILURE});
      }

      const attributes = await new Promise((res) => {
        cognitoUser.getUserAttributes((err, _attributes) => {
          if(err) {
            console.error('Error getting user attributes', err)
            return res(err)
          }
          
          res(_attributes)
        })
      })

      const activeUser = { Id: cognitoUser.username, attributes }    
      const users = await invokeApig({ path: '/users'});


      let user = _find(users, { Id: activeUser.Id })

      if (!user) {
        user = await invokeApig({ path: '/users', method: 'post', body: activeUser });
        users.push(user);
      }
      
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          activeUser: {
            favoriteRecipes: [],
            ...cognitoUser,
            ...user,
          },
          users,
        }
      })
    } catch (err) {
      console.error(err);

      return dispatch({type: LOGIN_FAILURE});
    }
  }
}

export function logout() {
  signOutUser()

  return {
    type: LOGOUT
  }
}

export function updateUser(user) {
  return async (dispatch) => {
    const updatedUser = await invokeApig({
      path: '/users',
      method: 'put',
      body: _pick(user, ['Id', 'favoriteRecipes']),
    });

    dispatch({
      type: UPDATE,
      payload: updatedUser.data,
    })
  }
}

export const actions = {
  login,
  updateUser,
  logout,
}

const ACTION_HANDLERS = {
  [LOGIN_SUCCESS]: (state, { payload }) => {
    return {
      authenticating: false,
      ...payload,
    };
  },
  [LOGIN_FAILURE]: (state, { payload }) => {
    return {
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
      activeUser: {},
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