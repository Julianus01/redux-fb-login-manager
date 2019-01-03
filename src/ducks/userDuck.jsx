import { createReducer } from 'redux-create-reducer'
import firebase from 'firebase'

// Types
const LOGIN = '[user] LOGIN'
const LOGOUT = '[user] LOGOUT'
const CHANGE_USER = '[user] CHANGE_USER'

const initialState = JSON.parse(localStorage.getItem('user'))

// Reducer
export default createReducer(initialState, {
  [LOGIN](state, action) {
    const { user } = action.payload
    return user
  },

  [CHANGE_USER](state, action) {
    const { user } = action.payload
    return user
  }
})

// Actions
export const loginWithEmailAndPassword = credentials => async dispatch => {
  try {
    await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
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
    dispatch({ type: CHANGE_USER, payload: { user } })
  } else {
    localStorage.removeItem('user')
    dispatch({ type: CHANGE_USER, payload: { user: null } })
  }
}
