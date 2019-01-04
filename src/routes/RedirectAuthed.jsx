import React from 'react'
import { Redirect } from 'react-router-dom'
import NoNavRoute from './NoNavRoute'
import { connect } from 'react-redux'

const RedirectAuthed = ({ user, ...rest }) => {
  if (user)
    return <Redirect to='/home' />

  return <NoNavRoute {...rest} />
}

export default connect(
  state => ({ user: state.auth.user })
)(RedirectAuthed)
