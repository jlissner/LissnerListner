import { toast } from 'react-toastify'
import _get from 'lodash/get';
import _omitBy from 'lodash/omitBy';
import { setCookie, deleteCookie } from '../../lib/cookies';
import graphql, { objToGraphqlStr } from '../../lib/graphql';

export const LOGIN = 'USER::LOGIN';
export const LOGIN_SUCCESS = 'USER::LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'USER::LOGIN_FAILURE';
export const GET_CURRENT_USER = 'USER::GET_CURRENT_USER';
export const GET_CURRENT_USER_SUCCESS = 'USER::GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_FAILURE = 'USER::GET_CURRENT_USER_FAILURE';
export const USERS = 'USER::USERS';
export const USERS_SUCCESS = 'USER::USERS_SUCCESS';
export const USERS_FAILURE = 'USER::USERS_FAILURE';
export const UPDATE = 'USER::UPDATE'
export const UPDATE_SUCCESS = 'USER::UPDATE_SUCCESS'
export const UPDATE_FAILURE = 'USER::UPDATE_FAILURE'
export const UPDATE_PASSWORD = 'USER::UPDATE_PASSWORD'
export const UPDATE_PASSWORD_SUCCESS = 'USER::UPDATE_PASSWORD_SUCCESS'
export const UPDATE_PASSWORD_FAILURE = 'USER::UPDATE_PASSWORD_FAILURE'
export const FAVORITE_UPDATED = 'USER::FAVORITE_UPDATED';
export const CREATE = 'USER::CREATE';
export const CREATE_SUCCESS = 'USER::CREATE_SUCCESS';
export const CREATE_FAILURE = 'USER::CREATE_FAILURE';
export const LOGOUT = 'USER::LOGOUT';

const userQuery = `
  idPk
  legalFirstName
  legalMiddleName
  legalLastName
  birthFirstName
  birthMiddleName
  birthLastName
  preferredName
  nickname
  email
  birthday
  avatar
  isAdmin
  gender
  phoneNumber
  lastOnline
`;


function getUsers() {
  return async (dispatch) => {
    dispatch({ type: USERS });

    try {
      const res = await graphql({
        query: `
          query {
            allPeople {
              nodes {
                ${userQuery}
              }
            }
          }
        `
      });
      const users = _get(res, 'allPeople.nodes');

      dispatch({ type: USERS_SUCCESS, payload: users });
    } catch (err) {
      dispatch({ type: USERS_FAILURE, payload: err });
    }
  }
}

function setLastOnline() {
  const body = {
    query: `
      mutation {
        setLastLogin(input: {}) {
          clientMutationId
        }
      }      
    `
  };

  return graphql(body);
}

export function getCurrentUser() {
  return async (dispatch) => {
    dispatch({ type: GET_CURRENT_USER });

    const body = {
      query: `
        query {
          getCurrentUser {
            ${userQuery}

            favorites: cookbookFavoriteRecipesByUserFk {
              nodes {
                recipeFk
              }
            }
          }
        }
      `,
    };


    try {
      const res = await graphql(body);
      const user = _get(res, 'getCurrentUser', {});
      const favorites = _get(res, 'getCurrentUser.favorites.nodes', {}).map(({ recipeFk }) => recipeFk);

      setLastOnline();

      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: {
          ...user,
          favorites,
        }
      });
      dispatch(getUsers());
    } catch (err) {
      logout();
      dispatch({ type: GET_CURRENT_USER_FAILURE, payload: err });
    }
  }
}


export function login(email, pass) {
  return async (dispatch) => {
    dispatch({ type: LOGIN });
    const body = {
      query: `
        mutation {
          authenticate(input: {email: "${email}", pass: "${pass}"}) {
            jwtToken
          }  
        }
      `,
    };

    try {
      const res = await graphql(body);
      const token = _get(res, 'authenticate.jwtToken');

      if (!token) {
        throw new Error('Incorrect credentials');
      }

      const sevenDays = 60 * 60 * 24 * 7;

      setCookie('userJWT', token, sevenDays);



      toast.success('Logged in');

      dispatch({ type: LOGIN_SUCCESS });
      dispatch(getCurrentUser());
    } catch (err) {
      toast.error(err.message)

      dispatch({ type: LOGIN_FAILURE, payload: err });
    }
  }
}

export function logout() {
  deleteCookie('userJWT');

  return {
    type: LOGOUT
  }
}

export function updateUser(user) {
  return async (dispatch, getState) => {
    dispatch({
      type: UPDATE,
    });
    const currentUser = getState().user.activeUser;
    const patch = _omitBy(user, (val, key) => currentUser[key] === val);
    const patchStr = objToGraphqlStr(patch);
    const body = {
      query: `
        mutation {
          updatePersonByIdPk(input: {idPk: "${user.idPk}", personPatch: {${patchStr}}}) {
            person {
              idPk
            }
          }
        }
      `
    };

    try {
      await graphql(body);

      dispatch({
        type: UPDATE_SUCCESS,
        payload: user,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_FAILURE,
        payload: err,
      });
    }
  }
}

export function updateUserPassword({ idPk, currentPassword, newPassword }) {
  return async (dispatch, getState) => {
    dispatch({
      type: UPDATE_PASSWORD,
    });
    const body = {
      query: `
        mutation {
          updateUserPassword(input: {
            personId: "${idPk}",
            currentPassword: "${currentPassword}",
            newPassword: "${newPassword}"
          }) {
            bigInt
          }
        }
      `
    };

    try {
      const res = await graphql(body);
      const bigInt = _get(res, 'updateUserPassword.bigInt');

      if (!bigInt) {
        throw new Error(_get(res, 'errors[0].message', 'Something went wrong'));
      }

      toast.success('Password Successfully changed');

      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
      });
      dispatch(getCurrentUser());
    } catch (err) {
      toast.error(err.message);

      dispatch({
        type: UPDATE_PASSWORD_FAILURE,
        payload: err,
      });
    }
  }
}

function addFavorite(recipeFk) {
  const body = {
    query: `
      mutation {
        createCookbookFavoriteRecipe(input: {cookbookFavoriteRecipe: {recipeFk: "${recipeFk}", cookbookFk: "1"}}) {
          clientMutationId
        }
      }
    `
  }

  return graphql(body);
}

function removeFavorite(recipeFk) {
  const body = {
    query: `
      mutation {
        removeFavoriteRecipe(input: {recipeId: "${recipeFk}", cookbookId: "1"}) {
          clientMutationId
        }
      }
    `
  }

  return graphql(body);
}

export function toggleFavorite(recipeFk) {
  return async (dispatch, getState) => {
    const { favorites } = getState().user.activeUser;
    const isFavorite = favorites.indexOf(recipeFk) > -1;

    if (isFavorite) {
      await removeFavorite(recipeFk);
    } else {
      await addFavorite(recipeFk);
    }

    dispatch({ type: FAVORITE_UPDATED });

    dispatch(getCurrentUser()); 
  }
}

export function createUser(user) {
  return async (dispatch) => {
    dispatch({ type: CREATE })

    const body = {
      query: `
        mutation {
          createPerson(input: {person: {${objToGraphqlStr(user)}}}) {
            clientMutationId
          }
        }
      `
    };

    console.log({ body })

    try {
      await graphql(body);

      dispatch({ type: CREATE_SUCCESS });
      dispatch(getUsers());
    } catch (err) {
      toast.error('Create User Failed');

      dispatch({ type: CREATE_FAILURE, payload: err });
    }
  }
}

export const actions = {
  login,
  updateUser,
  logout,
  getCurrentUser,
  getUsers,
  toggleFavorite,
}

const ACTION_HANDLERS = {
  [UPDATE_PASSWORD_FAILURE]: (state, { payload }) => {
    return {
      ...state,
      activeUser: {
        ...state.activeUser,
      },
    };
  },
  [LOGIN]: (state, { payload }) => {
    return {
      ...state,
      loggingIn: true,
    };
  },
  [LOGIN_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      loggingIn: false,
    };
  },
  [LOGIN_FAILURE]: (state, { payload }) => {
    return {
      ...state,
      loggingIn: false,
      authenticating: false,
    };
  },
  [GET_CURRENT_USER_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      activeUser: payload,
    }
  },
  [GET_CURRENT_USER_FAILURE]: (state) => {
    return {
      ...state,
      authenticating: false,
    };
  },
  [USERS_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      authenticating: false,
      users: payload,
    }
  },
  [UPDATE_SUCCESS]: (state, { payload }) => {
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