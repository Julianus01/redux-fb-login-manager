import React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import TestComponent from './components/TestComponent'

const App = () => (
  <Provider store={store}>
    <TestComponent />
  </Provider>
)

export default App
