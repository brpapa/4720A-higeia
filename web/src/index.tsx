import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Switch } from 'react-router-dom'

import './index.scss'
import UnloggedRoute from './utils/unlogged-route'
import LoggedRoute from './utils/logged-route'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'

const App = () => {
  return (
    <BrowserRouter>
      {/* TODO: renderizado independente da url atual, colocar Toasts? */}

      {/* o componente da 1a rota com path igual à url atual será rendererizado; no caso, todas as rotas são privadas, com excessão de /login e /register */}
      <Switch>
        <UnloggedRoute path='/login' component={Login} />
        <UnloggedRoute path='/register' component={Register} />
        <LoggedRoute path='/' component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
