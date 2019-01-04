import React from 'react'
import { Redirect } from 'react-router-dom'
import NoNavRoute from './NoNavRoute'
import { connect } from 'react-redux'
import { getUser } from '../state/selectors/authSelectors';

const RedirectAuthed = ({ user, ...rest }) => {
  if (user)
    return <Redirect to='/home' />

  return <NoNavRoute {...rest} />
}

const mapStateToProps = state => ({
  user: getUser(state)
})

export default connect(mapStateToProps)(RedirectAuthed)
