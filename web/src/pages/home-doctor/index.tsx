import React, { useEffect, useContext } from 'react'
import { Switch, Route } from 'react-router-dom'

import api from '../../services/api'
import { UserContext } from '../home-user'

export default () => {
  const { username } = useContext(UserContext)

  return <></>
}
