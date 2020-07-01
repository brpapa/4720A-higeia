const { Router } = require('express')
const patient = require('./controllers/patient')
const doctor = require('./controllers/doctor')
const user = require('./controllers/_user')
const auth = require('./auth')

module.exports = Router()
  .post('/register', () => {})
  .get('/login', auth, (_, res) => res.sendStatus(202))

  .get('/patients', auth, patient.index) // retorna dados de todos os pacientes
  .post('/patients', auth, patient.store) // registra um novo paciente
  .get('/patients/:id', auth, patient.show) // retorna dados do paciente com o id
  .put('/patients/:id', auth, patient.update) // atualiza o paciente registrado com o id
  .delete('/patients/:id', auth, patient.delete) // delete o paciente registrado com o id

  .get('/doctors', auth, doctor.index) // retorna dados de todos os doutores
  .post('/doctors', auth, doctor.store) // registra um novo doutor
  .get('/doctors/:id', auth, doctor.show) // retorna dados do doutor com o id
  .put('/doctors/:id', auth, doctor.update) // atualiza o doutor registrado com o id
  .delete('/doctors/:id', auth, doctor.delete) // delete o doutor registrado com o id

  .get('/test', (req, res) => {})
