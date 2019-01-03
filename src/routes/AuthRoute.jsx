import React from 'react'
import NavRoute from './NavRoute'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// export default withAuthContainer(({ authContainer, ...rest }) => {
//   if (!authContainer.state.user) return <Redirect to='/login' />

//   return <NavRoute {...rest} />
// })

const AuthRoute = ({ user, ...rest }) => {
  if (!user)
    return <Redirect to='login' />

  return <NavRoute {...rest} />
}

export default connect(
  state => ({ user: state.user })
)(AuthRoute)
