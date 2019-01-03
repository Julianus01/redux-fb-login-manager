import React from 'react'
import * as testActions from '../ducks/testDuck'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const TestComponent = props => {
  console.log(props)
  const testFunc = async () => {
    await props.actions.testAction()
    console.log('Second')
  }

  return (
    <React.Fragment>
      <div>Hello from Test Component</div>
      <button onClick={testFunc}>click me</button>
    </React.Fragment>
  )
}

export default connect(
  state => ({
    test: state.test
  }),
  dispatch => ({
    actions: bindActionCreators({ ...testActions }, dispatch)
  })
)(TestComponent)