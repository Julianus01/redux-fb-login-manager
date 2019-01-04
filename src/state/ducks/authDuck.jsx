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

const initialState = {
  user: JSON.parse(localStorage.getItem('user'))
}

// Reducer
export default createReducer(initialState)({
  [AUTH_STATE_CHANGED]: (state, action) => {
    const { user } = action.payload
    return { ...state, user }
  },
})

// Action Creators
export const loginWithEmailAndPassword = credentials => async dispatch => {
  try {
    dispatch(loginWithEmailRequest())
    await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
    dispatch(loginWithEmailSuccess())
  } catch (error) {
    console.log(error)
  }
}

export const loginWithGoogle = () => async dispatch => {
  try {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    dispatch(loginWithGmailRequest())
    await firebase.auth().signInWithPopup(googleProvider)
    dispatch(loginWithGmailSuccess())
  } catch (error) {
    console.log(error)
  }
}

export const loginWithFacebook = () => async dispatch => {
  try {
    const facebookProvider = new firebase.auth.FacebookAuthProvider()
    dispatch(loginWithFacebookRequest())
    await firebase.auth().signInWithPopup(facebookProvider)
    dispatch(loginWithFacebookSuccess())
  } catch (error) {
    console.log(error)
  }
}

export const logout = () => async dispatch => {
  try {
    dispatch(logoutRequest())
    await firebase.auth().signOut()
    dispatch(logoutSuccess())
  } catch (error) {
    console.log(error)
  }
}

export const startListeningToAuthStateChanges = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
      dispatch(authStateChanged(user))
    } else {
      localStorage.removeItem('user')
      dispatch(authStateChanged(null))
    }
  })
}

// Actions
const loginWithEmailRequest = () => ({ type: LOGIN_WITH_EMAIL_REQUEST })
const loginWithEmailSuccess = () => ({ type: LOGIN_WITH_EMAIL_SUCCESS })

const loginWithGmailRequest = () => ({ type: LOGIN_WITH_GMAIL_REQUEST })
const loginWithGmailSuccess = () => ({ type: LOGIN_WITH_GMAIL_SUCCESS })

const loginWithFacebookRequest = () => ({ type: LOGIN_WITH_FACEBOOK_REQUEST })
const loginWithFacebookSuccess = () => ({ type: LOGIN_WITH_FACEBOOK_SUCCESS })

const logoutRequest = () => ({ type: LOGOUT_REQUEST })
const logoutSuccess = () => ({ type: LOGOUT_SUCCESS })

const authStateChanged = user => ({
  type: AUTH_STATE_CHANGED,
  payload: { user }
})
