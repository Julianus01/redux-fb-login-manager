// Components
import React from 'react'
import LoginPage from '../components/Pages/LoginPage'
import HomePage from '../components/Pages/HomePage'

// Custom routes
import AuthRoute from './AuthRoute'
import RedirectAuthed from './RedirectAuthed'
import NotFound from './NotFound'

import { Switch } from 'react-router-dom'

const Routes = () => (
  <Switch>
    <AuthRoute path='/home' exact={true} component={HomePage} />
    <RedirectAuthed path='/login' exact={true} component={LoginPage} />
    <NotFound path='*' exact={true} component={NotFound} />
  </Switch>
)

export default Routes
