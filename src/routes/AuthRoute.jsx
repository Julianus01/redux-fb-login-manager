import React from 'react'
import NavRoute from './NavRoute'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../state/selectors/authSelectors';

const AuthRoute = React.memo(({ user, ...rest }) => {
  if (!user)
    return <Redirect to='login' />

  return <NavRoute {...rest} />
})

const mapStateToProps = state => ({
  user: getUser(state)
})

export default connect(mapStateToProps)(AuthRoute)
