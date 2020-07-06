import React from 'react'
import { Layout } from 'antd'

import DoctorsList from './doctors-list'

const HomePatient: React.FC = () => {

  return (
    <>
      <Layout>
        <div>
          <DoctorsList />
        </div>
      </Layout>
    </>
  )
}

export default HomePatient
