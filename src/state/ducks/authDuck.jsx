import createReducer from '../utils/createReducer'
import firebase from 'firebase'
import UserEndpoints from '../../api/UserEndpoints';

// Types
const LOGIN_WITH_EMAIL_REQUEST = '[auth] LOGIN_WITH_EMAIL / REQUEST'
const LOGIN_WITH_EMAIL_SUCCESS = '[auth] LOGIN_WITH_EMAIL / SUCCESS'

const LOGIN_WITH_GMAIL_REQUEST = '[auth] LOGIN_WITH_GMAIL / REQUEST'
const LOGIN_WITH_GMAIL_SUCCESS = '[auth] LOGIN_WITH_GMAIL / SUCCESS'

const LOGIN_WITH_FACEBOOK_REQUEST = '[auth] LOGIN_WITH_FACEBOOK / REQUEST'
const LOGIN_WITH_FACEBOOK_SUCCESS = '[auth] LOGIN_WITH_FACEBOOK / SUCCESS'

const UPDATE_USER_DATA_REQUEST = '[auth] UPDATE_USER_DATA / REQUEST'
const UPDATE_USER_DATA_SUCCESS = '[auth] UPDATE_USER_DATA / SUCCESS'

const LOGOUT_REQUEST = '[auth] LOGOUT / REQUEST'
const LOGOUT_SUCCESS = '[auth] LOGOUT / SUCCESS'

const AUTH_STATE_CHANGED = '[auth] AUTH_STATE_CHANGED'

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
    const response = await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
    dispatch(loginWithEmailSuccess())

    await dispatch(updateUserData(response.user))
  } catch (error) {
    console.log(error)
  }
}

export const loginWithGoogle = () => async dispatch => {
  try {
    const googleProvider = new firebase.auth.GoogleAuthProvider()

    dispatch(loginWithGmailRequest())
    const response = await firebase.auth().signInWithPopup(googleProvider)
    dispatch(loginWithGmailSuccess())

    await dispatch(updateUserData(response.user))
  } catch (error) {
    console.log(error)
  }
}

export const loginWithFacebook = () => async dispatch => {
  try {
    const facebookProvider = new firebase.auth.FacebookAuthProvider()

    dispatch(loginWithFacebookRequest())
    const response = await firebase.auth().signInWithPopup(facebookProvider)
    dispatch(loginWithFacebookSuccess())

    await dispatch(updateUserData(response.user))
  } catch (error) {
    console.log(error)
  }
}

export const updateUserData = user => async dispatch => {
  try {
    dispatch(updateUserDataRequest())
    await UserEndpoints.updateUserData(user)
    dispatch(updateUserDataSuccess())
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

const updateUserDataRequest = () => ({ type: UPDATE_USER_DATA_REQUEST })
const updateUserDataSuccess = () => ({ type: UPDATE_USER_DATA_SUCCESS })

const logoutRequest = () => ({ type: LOGOUT_REQUEST })
const logoutSuccess = () => ({ type: LOGOUT_SUCCESS })

const authStateChanged = user => ({
  type: AUTH_STATE_CHANGED,
  payload: { user }
})
