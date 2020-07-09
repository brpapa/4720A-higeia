import React, { useState, useContext, useEffect } from 'react'
import moment from 'moment'
import { List, Card } from 'antd'

import api from '../../../services/api'
import { UserContext } from '../../home-user'
import DoctorLink from '../../../ui/doctor-link'

// filtra as prescrições da api que com experiration_date igual ou superior à atual
const filterPrescription = (prescription: any) => {
  const m = moment(prescription.expiration_date, 'YYYY-MM-DD')
  return m.isSameOrAfter(moment())
}
// mapeia as prescrições que vieram da api
const mapPrescription = (prescription: any) => {
  const m0 = moment(prescription.start_date, 'YYYY-MM-DD')
  const m1 = moment(prescription.expiration_date, 'YYYY-MM-DD')

  return {
    startDate: m0.format('DD/MM/YYYY'),
    expirationDate: m1.format('DD/MM/YYYY'),
    medicine: `${prescription.medicine_name}`,
    doctorId: `${prescription.appt_doctor_id}`,
    recipeMsg: `Tomar ${prescription.dose} ${
      prescription.dose_unit === 'pill' ? 'comp.' : prescription.dose_unit
    } ${prescription.frequency} vezes por ${
      prescription.frequency_per === 'hour' ? 'hora' : 'dia'
    }`,
  }
}

const Component: React.FC<{}> = (props) => {
  const [prescriptions, setPrescriptions] = useState<
    ReturnType<typeof mapPrescription>[]
  >([])
  const { username: patientId } = useContext(UserContext)

  // obtem as prescrições
  useEffect(() => {
    api
      .get(`/prescriptions/patient/${patientId}`)
      .then(({ data: prescs }) => {
        console.log(prescs)
        setPrescriptions(
          prescs.filter(filterPrescription).map(mapPrescription)
        )
      })
      .catch(console.log)
  }, [patientId])

  return (
    <List
      grid={{ gutter: 8, column: 4 }}
      dataSource={prescriptions}
      renderItem={(prescription) => (
        <List.Item>
          <Card title={prescription.medicine}>
            <p>
              {prescription.startDate} - {prescription.expirationDate}
            </p>
            <p>{prescription.recipeMsg}</p>
            <DoctorLink username={prescription.doctorId} />
          </Card>
        </List.Item>
      )}
    ></List>
  )
}

export default Component
