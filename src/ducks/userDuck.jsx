import { createReducer } from 'redux-create-reducer'
import firebase from 'firebase'

// Types
const LOGIN_REQUEST = '[user] LOGIN_REQUEST'
const LOGIN_SUCCESS = '[user] LOGIN_SUCCESS'
const LOGOUT = '[user] LOGOUT'
const AUTH_STATE_CHANGED = '[user] AUTH_STATE_CHANGED'

const initialState = JSON.parse(localStorage.getItem('user'))

// Reducer
export default createReducer(initialState, {
  [LOGIN_REQUEST](state) {
    return state
  },

  [LOGIN_SUCCESS](state) {
    return state
  },

  [AUTH_STATE_CHANGED](state, action) {
    const { user } = action.payload
    return user
  }
})

// Action Creators
export const loginWithEmailAndPassword = credentials => async dispatch => {
  try {
    dispatch({ type: LOGIN_REQUEST })
    await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
    dispatch({ type: LOGIN_SUCCESS })
    console.log('here')
  } catch (error) {
    console.log(error)
  }
}

export const logout = () => async dispatch => {
  dispatch({ type: LOGOUT, payload: { message: 'it worked' } })
}

export const changeUser = user => dispatch => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user))
    dispatch({ type: AUTH_STATE_CHANGED, payload: { user } })
  } else {
    localStorage.removeItem('user')
    dispatch({ type: AUTH_STATE_CHANGED, payload: { user: null } })
  }
}

export const startListeningToAuthStateChanges = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
      dispatch({ type: AUTH_STATE_CHANGED, payload: { user } })
    } else {
      localStorage.removeItem('user')
      dispatch({ type: AUTH_STATE_CHANGED, payload: { user: null } })
    }
  })
}
