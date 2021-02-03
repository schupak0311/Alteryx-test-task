import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import { PrivateRoute } from './PrivateRoute'

export const routes = (
  <>
    <Switch>
      <PrivateRoute path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
  </>
)
