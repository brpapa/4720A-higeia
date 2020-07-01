const { Router } = require('express')

const patient = require('../controllers/patient')
const doctor = require('../controllers/doctor')

module.exports = Router()
  .get('/patients', patient.index) // retorna dados de todos os pacientes
  .post('/patients', patient.store) // registra um novo paciente
  .get('/patients/:id', patient.show) // retorna dados do paciente com o id
  .put('/patients/:id', patient.update) // atualiza o paciente registrado com o id
  .delete('/patients/:id', patient.delete) // delete o paciente registrado com o id

  .get('/doctors', doctor.index) // retorna dados de todos os doutores
  .post('/doctors', doctor.store) // registra um novo doutor
  .get('/doctors/:id', doctor.show) // retorna dados do doutor com o id
  .put('/doctors/:id', doctor.update) // atualiza o doutor registrado com o id
  .delete('/doctors/:id', doctor.delete) // delete o doutor registrado com o id

  // .get('/appointments')
