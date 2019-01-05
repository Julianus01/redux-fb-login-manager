// Components
import React from 'react'
import { LoginPage, HomePage, RegisterPage } from '../components/Pages'

// Custom routes
import AuthRoute from './AuthRoute'
import RedirectAuthed from './RedirectAuthed'
import NotFound from './NotFound'

import { Switch } from 'react-router-dom'

const Routes = () => (
  <Switch>
    <AuthRoute path='/home' exact={true} component={HomePage} />
    <RedirectAuthed path='/login' exact={true} component={LoginPage} />
    <RedirectAuthed path='/register' exact={true} component={RegisterPage} />
    <NotFound path='*' exact={true} component={NotFound} />
  </Switch>
)

export default Routes
