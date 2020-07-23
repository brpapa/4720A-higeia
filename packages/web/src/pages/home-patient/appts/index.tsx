import React, { useState, useEffect, useContext } from 'react'
import { Timeline, Button, Popconfirm, Tag, message } from 'antd'
import moment from 'moment'

import api from '../../../services/api'
import { UserContext } from '../../home-user'
import DoctorLink from '../../../ui/doctor-link'
import Rate from '../../../ui/rate'

// mapeia as consultas que vieram da api
const mapAppt = (appt: any) => {
  const m = moment(`${appt.date} ${appt.start_time}`, 'YYYY-MM-DD hh:mm:ss')

  return {
    id: Number(appt.id),
    when: m.format('DD/MM/YY - HH:mm'),
    doctorId: `${appt.doctor_id}`,
    rating: Number(appt.rating), // 0 se for nulo
    diagnosis: appt.doctor_diagnosis || '',
    notes: appt.doctor_notes || '',
  }
}

const Component: React.FC<{ filter: 'scheduled' | 'completed' }> = (props) => {
  const [appts, setAppts] = useState<ReturnType<typeof mapAppt>[]>([])
  const { username } = useContext(UserContext)

  // obtem a lista das próximas consultas
  useEffect(() => {
    api
      .get(`/appointments/${props.filter}/patient/${username}`)
      .then(({ data: appts }) => {
        setAppts(appts.map(mapAppt))
      })
      .catch(console.log)
  }, [username, props.filter])

  // atualiza a consulta com o novo rating (props.filter === 'completed')
  function handleRateChange(apptId: number, value: number) {
    message.loading({ content: 'Carregando...', key: 'msg' })

    api
      .put(`/appointments/${apptId}`, { rating: value })
      .then(() => {
        message.success({
          content: `Consulta avaliada com nota ${value}`,
          key: 'msg',
        })
      })
      .catch((err) => {
        console.log(err)
        message.error({ content: 'Erro ao avaliar a consulta!', key: 'msg' })
      })
  }

  // atualiza a consulta agendada com o status "cancelled" (props.filter === 'scheduled')
  function handleDeleteAppt(apptId: number) {
    message.loading({ content: 'Carregando...', key: 'msg' })

    api
      .put(`/appointments/${apptId}`, { status: 'cancelled' })
      .then(() => {
        message.success({
          content: `Consulta removida com sucesso!`,
          key: 'msg',
        })
      })
      .catch((err) => {
        console.log(err)
        message.error({ content: 'Erro ao remover a consulta!', key: 'msg' })
      })
  }

  return (
    <Timeline mode='left'>
      {appts.map((appt) => (
        <Timeline.Item key={appt.id} label={appt.when}>
          Com <DoctorLink username={appt.doctorId} />
          <br />
          {props.filter === 'completed' && (
            <>
              < br/>
              <Tag>{appt.diagnosis}</Tag>
              < br/>
              <p>{appt.notes}</p>
              <Rate
                defaultValue={appt.rating}
                onChange={(value) => handleRateChange(appt.id, value)}
              />
            </>
          )}
          {props.filter === 'scheduled' && (
            <Popconfirm
              title='Você tem certeza disso?'
              onConfirm={() => handleDeleteAppt(appt.id)}
              okText='Sim'
              cancelText='Não'
            >
              <Button type='link' danger>
                Cancelar
              </Button>
            </Popconfirm>
          )}
        </Timeline.Item>
      ))}
    </Timeline>
  )
}

export default Component
