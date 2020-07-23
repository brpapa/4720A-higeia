import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import {
  Input,
  List,
  Modal,
  Button,
  Form,
  Select,
  DatePicker,
  Row,
  Col,
  message,
  Divider,
  InputNumber,
} from 'antd'
import moment from 'moment'

import api from '../../../services/api'
import { UserContext } from '../../home-user'

// filtra somente as consultas da api com data/hora inferior à atual
const filterAppt = (appt: any) => {
  const m = moment(`${appt.date} ${appt.start_time}`, 'YYYY-MM-DD hh:mm:ss')
  return m.isBefore(moment())
}
// mapeia as consultas que vieram da api
const mapAppt = (appt: any) => {
  const m = moment(`${appt.date} ${appt.start_time}`, 'YYYY-MM-DD hh:mm:ss')
  return {
    id: Number(appt.id),
    when: m.format('DD/MM/YY - HH:mm'),
    patientId: `${appt.patient_id}`,
  }
}
// mapeia os medicamentos que vieram da api
const mapMedicine = (medicine: any) => {
  return {
    id: Number(medicine.id),
    name: `${medicine.name} - ${medicine.concentration_in_mg} mg`,
  }
}

const ApptsList: React.FC = (props) => {
  const [appts, setAppts] = useState<ReturnType<typeof mapAppt>[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const [modalConfirmLoading, setModalConfirmLoading] = useState(false)

  // alguns dos dados enviados para a api
  const { username: doctorId } = useContext(UserContext)
  const [selectedApptId, setSelectedApptId] = useState<number | null>(null)

  // obtem a lista das consultas que já aconteceram e ainda não estão "completas"
  useEffect(() => {
    api
      .get(`/appointments/scheduled/doctor/${doctorId}`)
      .then(({ data: appts }) => {
        setAppts(appts.filter(filterAppt).map(mapAppt))
      })
      .catch(console.log)
  }, [doctorId])

  function handleModalOpen(selectedApptId: number) {
    setModalVisible(true)
    setSelectedApptId(selectedApptId)
  }
  function handleModalCancel() {
    setModalVisible(false)
    setSelectedApptId(null)
  }

  // recebe os valores do form e envia para a api (atualiza appt e cadastra uma prescrição)
  async function handleModalCreate(values: any) {
    const {
      doctor_diagnosis,
      doctor_notes,
      start_date,
      medicine_id,
      dose,
      dose_unit,
      frequency,
      frequency_per,
      duration,
      duration_in,
    } = values

    if (
      [
        doctor_diagnosis,
        doctor_notes,
        start_date,
        medicine_id,
        dose,
        dose_unit,
        frequency,
        frequency_per,
        duration,
        duration_in,
      ].some((v) => !v)
    )
      return

    message.loading({ content: 'Carregando...', key: 'msg' })
    setModalConfirmLoading(true)

    try {
      await api.put(`/appointments/${selectedApptId}`, {
        doctor_diagnosis,
        doctor_notes,
        status: 'completed',
      })
      await api.post('/prescriptions', {
        appt_id: selectedApptId,
        medicine_id,
        start_date: start_date.format('YYYY-MM-DD'),
        expiration_date: start_date.add(duration, duration_in).format('YYYY-MM-DD'),
        dose,
        dose_unit,
        frequency,
        frequency_per,
      })

      message.success({
        content: 'Consulta concluída com sucesso!',
        key: 'msg',
      })
      setModalConfirmLoading(false)
      setModalVisible(false)
    } catch (err) {
      console.log(err)
      message.error({ content: 'Erro!', key: 'msg' })
      setModalConfirmLoading(false)
    }
  }
  
  return (
    <>
      <List
        dataSource={appts}
        renderItem={(appt) => (
          <List.Item>
            <p>{appt.patientId}</p>
            <p>{appt.when}</p>
            <Button onClick={() => handleModalOpen(appt.id)}>Concluir</Button>
          </List.Item>
        )}
      />
      <ModalWithForm
        visible={modalVisible}
        confirmLoading={modalConfirmLoading}
        onCreate={handleModalCreate}
        onCancel={handleModalCancel}
      />
    </>
  )
}

export default ApptsList

// para adicionar uma prescrição, uma nota e um diagnostico
const ModalWithForm: React.FC<{
  visible: boolean
  confirmLoading: boolean
  onCreate: (values: any) => void
  onCancel: () => void
}> = ({ visible, confirmLoading, onCreate, onCancel }) => {
  const [medicines, setMedicines] = useState<ReturnType<typeof mapMedicine>[]>(
    []
  )
  const [form] = Form.useForm()

  // obtem todos os medicamentos
  useEffect(() => {
    api
      .get('/medicines')
      .then(({ data: medicines }) => {
        setMedicines(medicines.map(mapMedicine))
      })
      .catch(console.log)
  }, [])

  return (
    <Modal
      visible={visible}
      confirmLoading={confirmLoading}
      title='Concluir consulta'
      okText='Concluir'
      cancelText='Cancelar'
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            // form.resetFields()
            onCreate(values)
          })
          .catch((info) => {
            console.log(info)
          })
      }}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          name='doctor_diagnosis'
          label='Diagnóstico'
          rules={[
            {
              required: true,
              message: 'Por favor, insira um diagnóstico!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name='doctor_notes' label='Notas'>
          <Input.TextArea
            placeholder='Anote aqui algumas observações sobre a consulta, como os sintomas do paciente.'
            rows={2}
          />
        </Form.Item>

        <Divider>Adicionar uma prescrição</Divider>

        <Row gutter={8}>
          <Col span={12}>
            <Form.Item name='start_date' label='Data de início'>
              <DatePicker
                format='DD-MM-YYYY'
                placeholder=''
                disabledDate={(current) =>
                  current && current < moment().endOf('day')
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='medicine_id' label='Medicamento'>
              <Select
                placeholder='Digite para pesquisar'
                showSearch
                filterOption={(input, option) =>
                  option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {medicines.map((medicine) => (
                  <Select.Option key={medicine.id} value={medicine.id}>
                    {medicine.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* TODO: usar Form Group com input bloqueados? */}
        <Form.Item label='Receita' style={{ marginBottom: 0 }}>
          <BetweenFormItems>{'Tomar '}</BetweenFormItems>

          <Form.Item name='dose' style={{ display: 'inline-block' }}>
            <InputNumber
              size='small'
              style={{ width: '50px' }}
            />
          </Form.Item>
          <Form.Item name='dose_unit' style={{ display: 'inline-block' }}>
            <Select size='small' style={{ width: '80px' }}>
              <Select.Option value='mg'>mg</Select.Option>
              <Select.Option value='ml'>ml</Select.Option>
              <Select.Option value='pill'>comp.</Select.Option>
            </Select>
          </Form.Item>

          <BetweenFormItems> </BetweenFormItems>

          <Form.Item name='frequency' style={{ display: 'inline-block' }}>
            <InputNumber
              size='small'
              style={{ width: '50px' }}
            />
          </Form.Item>

          <BetweenFormItems>{' vezes por '}</BetweenFormItems>

          <Form.Item name='frequency_per' style={{ display: 'inline-block' }}>
            <Select size='small' style={{ width: '80px' }}>
              <Select.Option value='hour'>hora</Select.Option>
              <Select.Option value='day'>dia</Select.Option>
            </Select>
          </Form.Item>

          <BetweenFormItems>{' durante '}</BetweenFormItems>

          <Form.Item name='duration' style={{ display: 'inline-block' }}>
            <InputNumber
              defaultValue={0}
              size='small'
              style={{ width: '50px' }}
            />
          </Form.Item>
          <Form.Item name='duration_in' style={{ display: 'inline-block' }}>
            <Select size='small' style={{ width: '80px' }}>
              <Select.Option value='days'>dias</Select.Option>
              <Select.Option value='weeks'>semanas</Select.Option>
              <Select.Option value='months'>meses</Select.Option>
            </Select>
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const BetweenFormItems = styled.span`
  margin: 0 10px 0 10px;
  display: inline-block;
  line-height: 32px;
  text-align: center;
`
