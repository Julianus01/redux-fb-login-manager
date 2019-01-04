import React from 'react'
import NavRoute from './NavRoute'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const AuthRoute = ({ user, ...rest }) => {
  if (!user)
    return <Redirect to='login' />

  return <NavRoute {...rest} />
}

export default connect(
  state => ({ user: state.auth.user })
)(AuthRoute)
