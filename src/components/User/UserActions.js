import _find from 'lodash/find';
import _map from 'lodash/map';
import _pick from 'lodash/pick';
import { authUser, invokeApig, signOutUser } from '../../lib/awsLib';
import { listUsers } from '../../lib/aws/cognito';

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
      const cognitoUsersPromise = listUsers();
      const dynamoUsersPromise = invokeApig({ path: '/users'});
      const [cognitoUsers, dynamoUsers] = await Promise.all([cognitoUsersPromise, dynamoUsersPromise]);
      const userExists = Boolean(_find(dynamoUsers, { Id: activeUser.Id }));

      if (!userExists) {
        const newUser = await invokeApig({ path: '/users', method: 'post', body: activeUser });

        dynamoUsers.push(newUser);
      }

      const formattedUsers = _map(cognitoUsers, u1 => {
        const u2 = _find(dynamoUsers, { Id: u1.id });

        return {
          ...u1,
          ...u2,
        };
      });
      const formattedActiveUser = _find(formattedUsers, { id: activeUser.Id });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          activeUser: {
            favoriteRecipes: [],
            ...cognitoUser,
            ...formattedActiveUser,
          },
          users: formattedUsers,
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