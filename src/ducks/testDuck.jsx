import { createReducer } from 'redux-create-reducer'

// Types
const TEST_REQUEST = '[test] TEST_REQUEST'

// Reducer
export default createReducer({}, {
  [TEST_REQUEST](state, action) {
    const { message } = action.payload
    return { ...state, message }
  }
})

// Actions
export const testAction = () => async dispatch => {
  dispatch({ type: TEST_REQUEST, payload: { message: 'it worked' } })
}
