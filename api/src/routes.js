const { Router } = require('express')

const auth = require('./middlewares/auth')
const user = require('./controllers/user')
const patient = require('./controllers/patient')
const doctor = require('./controllers/doctor')
const appt = require('./controllers/appointment')
const prescription = require('./controllers/prescription')
const medicine = require('./controllers/medicine')

module.exports = Router()
  .get('/login/:id', auth, user.who) // retorna o tipo do usuário (patient ou doctor)

  .get('/patients', auth, patient.index) // retorna os dados de todos os pacientes
  .get('/doctors', auth, doctor.index) // retorna os dados de todos os doutores
  .get('/medicines', auth, medicine.index) // retorna os dados de todos os medicamentos

  .get('/patients/:id', auth, patient.show) // retorna os dados de um paciente
  .get('/doctors/:id', auth, doctor.show) // retorna os dados de um doutor
  .get('/doctors/opening-hours/:id', auth, doctor.showOpeningHours) // retorna os horários disponíveis de um doutor em um data (passada como um `date` query param)
  .get('/appointments/:status/:user/:id', auth, appt.show) // retorna os dados de todas as consultas ordenadas pela mais recente de um usuário ('patient' or 'doctor') com um status
  .get('/prescriptions/:user/:id', auth, prescription.show) // retorna os dados de todas as prescrições de um usuário

  .post('/patients', patient.store) // TODO: registra um novo paciente
  .post('/doctors', doctor.store) // TODO: registra um novo doutor
  .post('/appointments', auth, appt.store) // registra uma nova consulta, passando no body `status`, `patient_id`, `doctor_id`, `date`, `start_time`
  .post('/prescriptions', auth, prescription.store) // registra uma nova prescrição, passando no body `appt_id`, `medicine_id`, `start_date`, `expiration_date`, `dose`,`dose_unit`,`frequency`,`frequency_per`

  .put('/patients/:id', auth, patient.update) // TODO: atualiza um paciente
  .put('/doctors/:id', auth, doctor.update) // TODO: atualiza um doutor
  .put('/appointments/:id', auth, appt.update) // atualiza uma consulta nos atributos `status`, `doctor_diagnosis`, `doctor_notes`, `rating` passados no body (é permitido não passar algum caso não queria atualizá-lo)

  .delete('/users/:id', auth, user.delete) // deleta um usuário (patient ou doctor)
