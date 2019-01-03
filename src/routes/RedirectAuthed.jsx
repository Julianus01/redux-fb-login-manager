import React from 'react'
import { Redirect } from 'react-router-dom'
import NoNavRoute from './NoNavRoute'

// export default withAuthContainer(({ authContainer, ...rest }) => {
//   if (authContainer.state.user)
//     return <Redirect to='/posts' />
    
//   return <NoNavRoute {...rest} />
// })

export default props => <NoNavRoute {...props} />
