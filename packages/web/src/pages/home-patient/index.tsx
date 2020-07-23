import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Tabs } from 'antd'

import BookAppt from './book-appt'
import Appts from './appts'
import ActivePrescriptions from './active-prescriptions'

export default () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Tabs
          defaultActiveKey='1'
          style={{ margin: '0px 20px 0px 20px' }}
        >
          <Tabs.TabPane tab='Agendar consulta' key='1'>
            <BookAppt />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Prescrições em vigor' key='2'>
            <ActivePrescriptions />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Próximas consultas agendadas' key='3'>
            <Appts filter='scheduled' />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Últimas consultas completadas' key='4'>
            <Appts filter='completed' />
          </Tabs.TabPane>
        </Tabs>
      </Route>
      <Route path='/doctors/:id'>
        <p>Página pública do doutor</p>
      </Route>
    </Switch>
  )
}
