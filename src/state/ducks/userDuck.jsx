import createReducer from '../utils/createReducer'
import firebase from 'firebase'

// Types
const LOGIN_WITH_EMAIL_REQUEST = '[user] LOGIN_WITH_EMAIL_REQUEST'
const LOGIN_WITH_EMAIL_SUCCESS = '[user] LOGIN_WITH_EMAIL_SUCCESS'

const LOGIN_WITH_GMAIL_REQUEST = '[user] LOGIN_WITH_GMAIL_REQUEST'
const LOGIN_WITH_GMAIL_SUCCESS = '[user] LOGIN_WITH_GMAIL_SUCCESS'

const LOGIN_WITH_FACEBOOK_REQUEST = '[user] LOGIN_WITH_FACEBOOK_REQUEST'
const LOGIN_WITH_FACEBOOK_SUCCESS = '[user] LOGIN_WITH_FACEBOOK_SUCCESS'

const LOGOUT_REQUEST = '[user] LOGOUT_REQUEST'
const LOGOUT_SUCCESS = '[user] LOGOUT_SUCCESS'

const AUTH_STATE_CHANGED = '[user] AUTH_STATE_CHANGED'

const initialState = JSON.parse(localStorage.getItem('user'))

// Reducer
export default createReducer(initialState)({
  [AUTH_STATE_CHANGED]: (state, action) => {
    const { user } = action.payload
    return user
  },
})

// Action Creators
export const loginWithEmailAndPassword = credentials => async dispatch => {
  try {
    dispatch({ type: LOGIN_WITH_EMAIL_REQUEST })
    await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
    dispatch({ type: LOGIN_WITH_EMAIL_SUCCESS })
    console.log('here')
  } catch (error) {
    console.log(error)
  }
}

export const loginWithGoogle = () => async dispatch => {
  try {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    dispatch({ type: LOGIN_WITH_GMAIL_REQUEST })
    await firebase.auth().signInWithPopup(googleProvider)
    dispatch({ type: LOGIN_WITH_GMAIL_SUCCESS })
  } catch (error) {
    console.log(error)
  }
}

export const loginWithFacebook = () => async dispatch => {
  try {
    const facebookProvider = new firebase.auth.FacebookAuthProvider()
    dispatch({ type: LOGIN_WITH_FACEBOOK_REQUEST })
    await firebase.auth().signInWithPopup(facebookProvider)
    dispatch({ type: LOGIN_WITH_FACEBOOK_SUCCESS })
  } catch (error) {
    console.log(error)
  }
}

export const logout = () => async dispatch => {
  try {
    dispatch({ type: LOGOUT_REQUEST })
    await firebase.auth().signOut()
    dispatch({ type: LOGOUT_SUCCESS })
  } catch (error) {
    console.log(error)
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
