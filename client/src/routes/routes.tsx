import React from 'react'
import { Route, Switch } from 'react-router-dom'
import CV from '../pages/CV'
import Login from '../pages/Login'
import { PrivateRoute } from './PrivateRoute'

export const routes = (
  <>
    <Switch>
      <PrivateRoute path="/" component={CV} />
      <Route path="/login" component={Login} />
      {/* <Route path="/signup" component={Signup} /> */}
    </Switch>
  </>
)
