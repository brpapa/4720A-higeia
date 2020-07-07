import React, { useState, useEffect, useContext } from 'react'
import { Timeline } from 'antd'

import api from '../../services/api'
import { UserContext } from '../home-user'
import DoctorLink from './../../ui/doctor-link'

const mapApptFromApi = (appt: any) => ({
  id: Number(appt.id),
  when: `${appt.date} às ${appt.start_time}`,
  doctorId: `${appt.doctor_id}`,
})

const Component: React.FC<{ filter: 'scheduled' | 'completed' }> = (props) => {
  const [appts, setNextAppts] = useState<ReturnType<typeof mapApptFromApi>[]>(
    []
  )
  const { username } = useContext(UserContext)

  // obtem a lista das próximas consultas
  useEffect(() => {
    api
      .get(`/appointments/${props.filter}/patient/${username}`)
      .then(({ data: appts }) => {
        setNextAppts(appts.map(mapApptFromApi))
      })
      .catch(console.log)
  }, [])

  return (
    <Timeline mode='left'>
      {appts.map((appt) => (
        <Timeline.Item key={appt.id} label={appt.when}>
          Com <DoctorLink username={appt.doctorId} />
        </Timeline.Item>
      ))}
    </Timeline>
  )
}

export default Component
