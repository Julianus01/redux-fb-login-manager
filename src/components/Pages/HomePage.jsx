import React from 'react'
import { getUser } from '../../state/selectors/authSelectors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as authActions from '../../state/ducks/authDuck'

const HomePage = ({ user, actions }) => {
  console.log('Home render')

  return (
    <div>
      <p>Home Page bici</p>
      <button onClick={actions.testAction}>press me</button>
    </div>
  )
}

const mapStateToProps = state => ({
  user: getUser(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(authActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)