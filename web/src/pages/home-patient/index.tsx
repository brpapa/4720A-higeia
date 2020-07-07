import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Tabs } from 'antd'

import BookAppt from './book-appt'
import Appts from './appts'

export default () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Tabs
          defaultActiveKey='1'
          onChange={console.log}
          style={{ margin: '0px 20px 0px 20px' }}
        >
          <Tabs.TabPane tab='Próximas consultas' key='1'>
            <Appts filter='scheduled' />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Últimas consultas' key='2'>
            <Appts filter='completed' />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Agendar consulta' key='3'>
            <BookAppt />
          </Tabs.TabPane>
        </Tabs>
      </Route>
      <Route path='/doctors/:id'>
        <p>Página pública do doutor</p>
      </Route>
    </Switch>
  )
}
