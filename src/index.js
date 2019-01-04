import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './fb_config'
import { Provider } from 'react-redux'
import store from './state/store'
import { startListeningToAuthStateChanges } from './state/ducks/authDuck'

store.dispatch(startListeningToAuthStateChanges())

const RootHTML = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(<RootHTML />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();