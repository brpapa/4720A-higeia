import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Col, Button } from 'antd'

import auth from '../../auth'
import api from '../../services/api'
import { TUser, TGender } from '../../types'
import Avatar from '../../ui/avatar'
import HomePatient from '../home-patient'
import HomeDoctor from '../home-doctor'

export const UserContext = React.createContext({
  username: auth.username || '',
})

export default () => {
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
        style={{
          backgroundColor: 'white',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          padding: '7px',
          marginBottom: '40px',
        }}
      >
        <Col flex='120px'></Col>
        <Col flex='auto'>
          <Row justify='space-between' align='middle'>
            <Col>{fullName}</Col>
            <Col>
              <Button type='link' onClick={handleLogout}>
                Sair
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <div style={{ position: 'absolute', top: '6px', left: '12px' }}>
        <Avatar user={user} gender={gender} size='lg' />
      </div>

      <UserContext.Provider value={{ username }}>
        {user === 'patient' && <HomePatient />}
        {user === 'doctor' && <HomeDoctor />}
      </UserContext.Provider>
    </>
  )
}
