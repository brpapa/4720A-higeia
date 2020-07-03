const { Router } = require('express')

const auth = require('./middlewares/auth')
const user = require('./controllers/user')
const patient = require('./controllers/patient')
const doctor = require('./controllers/doctor')
const appt = require('./controllers/appointment')

module.exports = Router()
  .get('/login/:id', auth, user.who) // retorna se o usuário é patient ou doctor

  .get('/patients', auth, patient.index) // retorna todos os dados de todos os pacientes
  .get('/doctors', auth, doctor.index) // retorna todos os dados de todos os doutores
  .get('/appointments/:user/:id', auth, appt.index) // retorna todos os dados de todas as consultas de um usuário ('patient' or 'doctor'), possivelmente filtrando com um `status` query param

  .get('/patients/:id', auth, patient.show) // retorna todos os dados de um paciente
  .get('/doctors/:id', auth, doctor.show) // retorna todos os dados de um doutor

  .post('/patients', patient.store) // TODO: registra um novo paciente
  .post('/doctors', doctor.store) // TODO: registra um novo doutor
  .post('/appointments', auth, appt.store) // DOING: registra uma nova consulta, passando no body `patient_id`, `doctor_id`
  
  .put('/patients/:id', auth, patient.update) // TODO: atualiza um paciente
  .put('/doctors/:id', auth, doctor.update) // TODO: atualiza um doutor
  
  .delete('/patients/:id', auth, patient.delete) // TODO: deleta um paciente
  .delete('/doctors/:id', auth, doctor.delete) // TODO: deleta um doutor

  // .get('/test', (req, res) => {})