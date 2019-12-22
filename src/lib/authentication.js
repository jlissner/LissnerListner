import _get from 'lodash/get';
import graphql from './graphql';
import { getCookie, setCookie, deleteCookie } from './cookies';

export function logout() {
  deleteCookie('userJWT');
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

  const sevenDays = 60 * 60 * 24 * 7;

  setCookie('userJWT', token, sevenDays)

  return token;
}

export async function getCurrentUser() {
  const token = getCookie('userJWT');

  if (!token) {
    return null
  }

  const body = {
    query: `
      query {
        getCurrentUser {
          idPk
          legalFirstName
          legalMiddleName
          legalLastName
          isAdmin
        }
      }
    `,
  };
  const headers = { Authorization: `Bearer ${token}`};

  try {
    const res = await graphql(body, headers);
    const user = _get(res, 'getCurrentUser', {});

    if (!user.idPk) {
      logout();

      return null;
    }

    return user;
  } catch (err) {
    console.error(err);

    logout();

    return null;
  }
}
