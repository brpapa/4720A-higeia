import React, { useEffect, useContext } from 'react'
import { Switch, Route } from 'react-router-dom'

import api from '../../services/api'
import { UserContext } from '../home'

const HomeDoctor: React.FC = () => {
  const { username } = useContext(UserContext)

  return (
    <>
      <Switch>
        <Route path='/appointments' component={() => <h1>Appt</h1>} />
        <Route path='/prescriptions' component={() => <h1>Presc</h1>} />
      </Switch>
    </>
  )
}

export default HomeDoctor
