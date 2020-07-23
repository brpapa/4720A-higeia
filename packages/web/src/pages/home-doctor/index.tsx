import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Tabs } from 'antd'

import PendingAppts from './pending-appts'

export default () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Tabs
          defaultActiveKey='1'
          style={{ margin: '0px 20px 0px 20px' }}
        >
          <Tabs.TabPane tab='Consultas pendentes' key='1'>
            <PendingAppts />
          </Tabs.TabPane>
          {/* <Tabs.TabPane tab='Consultas concluídas' key='2'>
          </Tabs.TabPane> */}
        </Tabs>
      </Route>
      {/* <Route path='/patients/:id'>
        <p>Página pública do paciente</p>
      </Route> */}
    </Switch>
  )
}
