import 'bootstrap/dist/js/bootstrap.bundle' // including popper.js
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './index.scss'
import PrivateRoute from './components/private-route'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'

const App = () => {
  return (
    <BrowserRouter>
      {/* renderizado independente da url atual */}

      {/* o componente da rota com path igual à url atual será rendererizado */}
      <Switch>
        <PrivateRoute exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
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
