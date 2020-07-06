import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Col, Button, PageHeader } from 'antd'

import auth from '../auth'
import api from '../services/api'
import { TUser, TGender } from '../types'
import Avatar from '../ui/avatar'
import HomePatient from './patient'
import HomeDoctor from './doctor'

export const UserContext = React.createContext({
  username: auth.username || '',
  user: auth.username || '',
})

const Home = () => {
  const [user] = useState<TUser>(auth.user || 'doctor')
  const [username] = useState(auth.username || '')
  const [gender, setGender] = useState<TGender>('M')
  const [fullName, setFullName] = useState('')

  const history = useHistory()

  useEffect(() => {
    api
      .get(`/${user}s/${username}`)
      .then(({ data }) => {
        setGender(data.gender)
        setFullName([data.first_name, data.last_name].join(' '))
      })
      .catch((err) => console.log(err))
  }, [user, username])

  function handleLogout() {
    auth.logout()
    history.replace('/login')
  }

  return (
    <>
      <Row
        justify='space-around'
        align='stretch'
        style={{ backgroundColor: 'white', padding: '10px', height: '50px' }}
      >
        <Col>
          <Avatar user={user} gender={gender} size='lg'/>
        </Col>
        <Col>
          <Button type='link' onClick={handleLogout}>
            Sair
          </Button>
        </Col>
      </Row>

      <PageHeader title={`Olá, ${fullName}`} />

      <UserContext.Provider value={{ user, username }}>
        {user === 'patient' && <HomePatient />}
        {user === 'doctor' && <HomeDoctor />}
      </UserContext.Provider>
    </>
  )
}

export default Home
