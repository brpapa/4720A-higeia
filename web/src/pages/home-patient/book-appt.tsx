import React, { useState, useEffect, useContext } from 'react'
import { List, Tag, Modal, Button, DatePicker, Select, Card } from 'antd'
import moment from 'moment'

import { TGender } from '../../types'
import api from '../../services/api'
import Rate from '../../ui/rate'
import Avatar from '../../ui/avatar'
import DoctorLink from '../../ui/doctor-link'
import { UserContext } from '../home-user'

const mapDoctorFromApi = (
  doctor: { [K: string]: string } & { gender: TGender }
) => ({
  id: doctor.id,
  gender: doctor.gender,
  spec: doctor.specialization_title,
  avgRating: Number(doctor.avg_rating),
})

export default () => {
  const [doctors, setDoctors] = useState<ReturnType<typeof mapDoctorFromApi>[]>(
    []
  )
  const [modalVisible, setModalVisible] = useState(false)
  const [modalConfirmLoading, setModalConfirmLoading] = useState(false)

  // dados enviados para api
  const { username: patientId } = useContext(UserContext)
  const [doctorId, setDoctorId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const [selectableTimes, setSelectableTimes] = useState<string[]>([])

  // obtem a lista de doutores
  useEffect(() => {
    api
      .get('/doctors')
      .then(({ data: doctors }) => {
        setDoctors(doctors.map(mapDoctorFromApi))
      })
      .catch(console.log)
  }, [])

  // obtem os horários em que o doutor selecionado atende após uma data ter sido selecionada
  useEffect(() => {
    if (date === '') return
    setTime('')

    api
      .get(`/doctors/opening-hours/${doctorId}`, { params: { date } })
      .then(({ data }) => {
        setSelectableTimes(data)
      })
      .catch(console.log)
  }, [doctorId, date])

  function handleModalOpen(doctorId: string) {
    setModalVisible(true)
    setDoctorId(doctorId)
  }
  function handleModalCancel() {
    setModalVisible(false)
    setDoctorId('')
    setDate('')
    setTime('')
  }
  function handleModalOk() {
    if ([doctorId, date, time].some((v) => v === '')) return

    setModalConfirmLoading(true)
    api
      .post('/appointments', {
        doctor_id: doctorId,
        patient_id: patientId,
        date: date,
        start_time: time,
      })
      .then(() => {
        setModalConfirmLoading(false)
        setModalVisible(false)
      })
      .catch(console.log)
  }

  return (
    <>
      <List
        // header='Encontre um doutor'
        grid={{ gutter: 8, column: 3 }}
        dataSource={doctors}
        renderItem={(doctor) => (
          <List.Item>
            <Card
              title={
                <>
                  <Avatar user='doctor' gender={doctor.gender} size='sm' />
                  <DoctorLink username={doctor.id} />
                  <br />
                  <Rate disabled allowHalf defaultValue={doctor.avgRating} />
                </>
              }
            >
              <Tag>{doctor.spec}</Tag>
              <Button onClick={() => handleModalOpen(doctor.id)}>
                Agendar
              </Button>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title={
          <>
            Agendar consulta com <DoctorLink username={doctorId} />
          </>
        }
        visible={modalVisible}
        confirmLoading={modalConfirmLoading}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText='Agendar consulta'
        cancelText='Cancelar'
      >
        {/* Conteúdo do Modal */}
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <p>{'Data: '}</p>
            <DatePicker
              format='YYYY-MM-DD'
              placeholder=''
              disabledDate={(current) =>
                current && current < moment().endOf('day')
              }
              onChange={(_, date) => setDate(date)}
            />
          </div>
          <div>
            <p>{'Horários livres: '}</p>
            <Select
              defaultValue=''
              placeholder='Horários'
              disabled={date === ''}
              style={{ width: 120 }}
              value={time}
              onChange={(time) => setTime(time)}
            >
              {selectableTimes.map((time) => (
                <Select.Option key={time} value={time}>
                  {time}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      </Modal>
    </>
  )
}
