import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import auth from '../auth'

// torna propriedade 'component' de RouteProps obrigatória
type Props = Required<Pick<RouteProps, 'component'>> &
  Omit<RouteProps, 'component'>

// um wrapper para Router que redireciona para a rota /login se o usuário não estiver autenticado
export default function ({ component: Component, ...rest }: Props) {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  )
}
