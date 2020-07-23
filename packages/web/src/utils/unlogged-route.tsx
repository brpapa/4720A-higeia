import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from '../auth'

import { RoutePropsWithComponent } from './types'

// Route wrapper que redireciona para a rota / se o usuário já estiver autenticado
export default function (props: RoutePropsWithComponent) {
  const { component: Component, ...rest } = props

  return (
    <Route
      {...rest}
      render={(props) =>
        !auth.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}
