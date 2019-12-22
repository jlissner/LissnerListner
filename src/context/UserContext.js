import React, { useReducer } from 'react';
import _get from 'lodash/get';
import _reduce from 'lodash/reduce';
import _trimStart from 'lodash/trimStart';
import graphql from '../lib/graphql';
import { getCookie, setCookie, deleteCookie } from '../lib/cookies';

const SEVEN_DAYS = 60 * 60 * 24 * 7;
const initialUser = {};

export async function getCurrentUser() {
  const token = getCookie('userJWT');
  const body = {
    query: `
      query {
        getCurrentUser {
          idPk
          legalFirstName
          legalMiddleName
          legalLastName
          isAdmin

          favorites: cookbookFavoriteRecipesByUserFk {
            nodes {
              recipeFk
            }
          }
        }
      }
    `,
  };

  const res = await graphql(body);
  const user = _get(res, 'getCurrentUser', {});
  const favorites = _get(res, 'getCurrentUser.favorites.nodes', {});

  return {
    ...user,
    favorites,
  }
}

export async function login({ email, pass }) {
  const body = {
    query: `
      mutation {
        authenticate(input: {email: "${email}", pass: "${pass}"}) {
          jwtToken
        }  
      }
    `,
  };

  const res = await graphql(body);
  const token = _get(res, 'authenticate.jwtToken');

  if (!token) {
    throw new Error('Incorrect credentials');
  }

  setCookie('userJWT', token, SEVEN_DAYS);

  return getCurrentUser();
}

export function logout() {
  deleteCookie('userJWT');

  return {};
}

export async function saveUser(user) {
  const patchStr = _reduce(user, (cur, val, key) => {
    return `${cur}, ${key}: ${JSON.stringify(val)}`;
  }, '');
  const patch = _trimStart(patchStr, ', ');
  const body = {
    query: `
      mutation {
        updatePersonByIdPk(input: {idPk: "${user.idPk}", personPatch: {${patch}}}) {
          person {
            idPk
          }
        }
      }
    `
  };

  try {
    const res = await graphql(body);

    return res.updatePersonByIdPk.person.idPk;
  } catch (err) {
    console.error(err);
  }
}

function setUser(user, updatedUser) {
  return { ...user, ...updatedUser };
}

const UserContext = React.createContext('user');

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(setUser, initialUser);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;
