import React from 'react'
import { Redirect } from 'react-router-dom'
import NoNavRoute from './NoNavRoute'
import { connect } from 'react-redux'

// export default withAuthContainer(({ authContainer, ...rest }) => {
//   if (authContainer.state.user)
//     return <Redirect to='/posts' />

//   return <NoNavRoute {...rest} />
// })

const RedirectAuthed = ({ user, ...rest }) => {
  if (user)
    return <Redirect to='/home' />

  return <NoNavRoute {...rest} />
}

export default connect(
  state => ({ user: state.user })
)(RedirectAuthed)
