import React from 'react';
import { connect } from 'react-redux'
import Routes from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import firebase from 'firebase'
import { bindActionCreators } from 'redux';
import * as userActions from './ducks/userDuck'

// const App = () => (
//   <Provider store={store}>
//     <Router>
//       <Routes />
//     </Router>
//   </Provider>
// )

class App extends React.Component {
  constructor(props) {
    super(props)
    const { actions } = this.props

    firebase.auth().onAuthStateChanged(user => {
      actions.changeUser(user)
    })
  }

  render() {
    console.log('App props: ', this.props)

    return (
      <Router>
        <Routes />
      </Router>
    )
  }
}

export default connect(
  null,
  dispatch => ({
    actions: bindActionCreators(userActions, dispatch)
  })
)(App)
