import { signOutUser } from '../../lib/awsLib'


export const LOGIN = 'USER::LOGIN'
export const LOGOUT = 'USER::LOGOUT'

export function login(username) {
  return {
    type: LOGIN,
    payload: username
  }
}

export function logout() {
  signOutUser()

  return {
    type: LOGOUT
  }
}

export const actions = {
  login,
  logout,
}

const ACTION_HANDLERS = {
  [LOGIN]: (state, { payload }) => {
    state.username = payload

    return {...state}
  },
  [LOGOUT]: (state) => {
    state.username = ''

    return {...state}
  }
}

const initialState = {
  username: '',
}

export default function gamePlayByPlayReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}